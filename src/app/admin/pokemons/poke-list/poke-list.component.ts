import { Component, DestroyRef, HostListener, inject, OnInit } from '@angular/core';
import { IPagination, IPokemonDetails } from '@pokemon/models';
import { PokemonService } from '@pokemon/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { forkJoin, map, of, startWith, switchMap, tap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { BreadcrumbComponent } from '@pokemon/shared/breadcrumb/breadcrumb.component';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-poke-list',
  imports: [MatButtonModule, MatIcon, BreadcrumbComponent, MatInputModule, RouterLink],
  templateUrl: './poke-list.component.html'
})
export class PokeListComponent implements OnInit {

  private pokeService = inject(PokemonService);
  private destroyRef = inject(DestroyRef);
  pokemonList: IPokemonDetails[] = [];
  pagination: IPagination = {
    limit: 100,
    offset: 0
  };

  onScrollLoading!: boolean;
  totalElements!: number;
  pageName: string = 'Pokemon List';
  searchKeyword!: string;
  @HostListener('window:scroll', [])
  onWindowScroll(event: any) {

    let allPageHeight = document.body.scrollHeight;
    let visiblePageHeight = document.body.clientHeight;
    let maxScroll = allPageHeight - visiblePageHeight;
    let scrollAmount = window.scrollY;

    if (allPageHeight > visiblePageHeight && !this.onScrollLoading) {
      if (maxScroll < (scrollAmount + 60)) {
        this.onScrollLoading = true;
        this.loadMorePokes();
      }
    }

  }

  ngOnInit(): void {
    this.getPokeList();
  }

  getPokeList() {
    this.pokeService.getPokemonList(this.pagination).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(res => this.totalElements = res.count),
      map((res) => res.results.map((pokemon) => ({
        ...pokemon,
        ...this.pokeService.cache[pokemon.name]
      }))),
      switchMap((pokemonList) =>
        forkJoin(
          pokemonList.map((pokemon) =>
            pokemon.sprites
              ? of(pokemon)
              : this.pokeService.getPokemonDetails(pokemon).pipe(
                tap((details) => Object.assign(pokemon, details)),
                startWith(pokemon)
              )
          )
        )
      )
    ).subscribe({
      next: (pokemonList) => {
        this.onScrollLoading = false;
        this.pokemonList = [...this.pokemonList, ...pokemonList];
        this.generatePageName();
        if (this.searchKeyword) {
          this.applyFilter();
        }
      }
    });
  }


  generatePageName(name = 'Pokemon List') {
    this.pageName = `${name} (${this.pokemonList.length} / ${this.totalElements})`
  }

  loadMorePokes() {
    if (this.totalElements > this.pokemonList.length) {
      this.pagination.offset += this.pagination.limit;
      this.getPokeList();
    }
  }

  onSearch(e: Event) {
    this.searchKeyword = (e.target as HTMLInputElement).value.trim();
    this.applyFilter();
  }

  applyFilter() {
    this.pokemonList.forEach(p => {
      if (p.name.toLowerCase().includes(this.searchKeyword.toLowerCase())) {
        p.hidden = false;
      } else {
        p.hidden = true;
      }
    });

    if (this.searchKeyword.length) {
      const _shownCount = this.pokemonList.filter(p => !p.hidden).length;
      const _name = `Pokemon List: <small>showing ${_shownCount} of ${this.pokemonList.length}</small>`
      this.generatePageName(_name);
    } else {
      this.generatePageName();
    }
  }

}

