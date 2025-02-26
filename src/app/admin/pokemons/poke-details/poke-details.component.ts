import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '@pokemon/services';
import { BreadcrumbComponent } from '@pokemon/shared/breadcrumb/breadcrumb.component';
import { concatMap, EMPTY, map, of } from 'rxjs';

@Component({
  selector: 'app-poke-details',
  imports: [BreadcrumbComponent, AsyncPipe, NgIf],
  templateUrl: './poke-details.component.html'
})
export class PokeDetailsComponent {
  private pokeService = inject(PokemonService);
  private route = inject(ActivatedRoute);

  pokemonDetail$ = this.route.paramMap.pipe(concatMap(params => {
    const _id = +params.get('id')!;
    if (_id) {
      const _cachedPokemon = this.pokeService.cache().find(p => p.id === _id);
      return _cachedPokemon ? of(_cachedPokemon) : this.pokeService.getPokemonById(_id);
    }
    return EMPTY;
  }));
}
