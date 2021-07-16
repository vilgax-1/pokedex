import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor(private http: HttpClient) {}

  getAllPokemon(pageNumber: number){
    return this.http.get(`pokemon?limit=18&offset=${ (pageNumber - 1) * 18 }`);
  }

  getPokemonName(name: string){
    return this.http.get(`pokemon/${name}`);
  }

  getDetailsPokemon(pokemonId: string){ 
    const clearUrl = pokemonId?.replace('https://pokeapi.co/api/v2/', '');
    return this.http.get(clearUrl);
  }

  getCharacteristic(id: number){
    return this.http.get(`characteristic/${id}/`).pipe(map((res: any) => res.descriptions))
  }
}
