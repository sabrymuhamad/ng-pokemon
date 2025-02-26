import { Injectable, signal } from '@angular/core';
import { APIService } from './api.service';
import { IApiResponse, IPagination, IPokemon, IPokemonDetails } from '@pokemon/models';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonService extends APIService {

  private _baseUrl = 'v2/pokemon';
  cache = signal<IPokemonDetails[]>([]);


  getPokemonList(pagination: IPagination): Observable<IApiResponse<IPokemon[]>> {
    return this.http.get<IApiResponse<IPokemon[]>>(`${this.apiUrl()}/${this._baseUrl}?offset=${pagination.offset}&limit=${pagination.limit}`, this.makeHeaders());
  }

  getPokemonById(id: number): Observable<IPokemonDetails> {
    return this.http.get<IPokemonDetails>(`${this.apiUrl()}/${this._baseUrl}/${id}`, this.makeHeaders());
  }

  getPokemonDetails(pokemon: IPokemon): Observable<IPokemonDetails> {
    const _pokemon = this.cache().find(p => p.name === pokemon.name);
    if (_pokemon) {
      return new Observable((observer) => {
        observer.next(_pokemon);
        observer.complete();
      });
    }

    return this.http.get<any>(pokemon.url).pipe(
      map((data) => {
        this.cache.update((val) => {
          val =  [data, ...val]
          return val
        });
        return data;
      })
    );
  }

}
