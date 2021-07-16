import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PokemonApiService } from 'src/app/services/api/pokemonApi.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemon: BehaviorSubject<any>  = new BehaviorSubject<any>('');

  constructor(private api: PokemonApiService) {}
  
  set searchPokemonByPage(page: number){
    this.api.getAllPokemon(page).subscribe(pokemon => 
      this.pokemon.next(pokemon), 
    err=> {
      this.pokemon.next({ results: []})
    });
  }
    
  set searchPokemonByName(name: string){
    this.api.getPokemonName(name).subscribe({
      next: pokemon => this.pokemon.next({ results: [pokemon]}),
      error: () => this.pokemon.next({ results: []})
    });
  }
  

  get getPokemonData(){
    return this.pokemon.asObservable();
  }
}
