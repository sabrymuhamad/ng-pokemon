import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { IApiResponse, IPagination, IPokemon, IPokemonDetails } from '@pokemon/models';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PokemonService extends APIService {

  private _baseUrl = 'v2/pokemon';
  cache: { [key: string]: IPokemonDetails } = {};


  getPokemonList(pagination: IPagination): Observable<IApiResponse<IPokemon[]>> {
    return this.http.get<IApiResponse<IPokemon[]>>(`${this.apiUrl()}/${this._baseUrl}?offset=${pagination.offset}&limit=${pagination.limit}`, this.makeHeaders());
  }

  findPokemonByName(pokeName: string): Observable<IApiResponse<IPokemon[]>> {
    return this.http.get<IApiResponse<IPokemon[]>>(`${this.apiUrl()}/${this._baseUrl}/${pokeName}`, this.makeHeaders());
  }

  findPokemonById(id: number): Observable<IApiResponse<IPokemon[]>> {
    return this.http.get<IApiResponse<IPokemon[]>>(`${this.apiUrl()}/${this._baseUrl}/${id}`, this.makeHeaders());
  }

  getPokemonDetails(pokemon: IPokemon): Observable<IPokemonDetails> {
    if (this.cache[pokemon.name]) {
      return new Observable((observer) => {
        observer.next(this.cache[pokemon.name]);
        observer.complete();
      });
    }

    return this.http.get<any>(pokemon.url).pipe(
      map((data) => {
        this.cache[pokemon.name] = data;
        return data;
      })
    );
  }

}
