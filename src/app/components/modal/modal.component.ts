import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {  Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { PokemonApiService } from 'src/app/services/api/pokemonApi.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent{
  description$ = new Observable();
  
  @Output() close = new EventEmitter<boolean>();
  @Input() set pokemonData(value: any){
    value.subscribe((data: any) => {
      if(data){
        this.pokemon = data;
        if(data.id){
          this.description$ = this.api.getCharacteristic(data.id)
        }
      }
    });
  }


  pokemon: any;
  showGraph = false;
  description = '';
  
  statistics = [
    { value: 0 , label: 'HP'},
    { value: 1, label: 'Attack' },
    { value: 2, label: 'Defense' },
    { value: 5, label: 'Speed' },
    { value: 3, label: 'Sp Atk' },
    { value: 4, label: 'Sp Def' },
  ]
  
  constructor(private api: PokemonApiService) {}

  getImage(value: any){
    return (value?.sprites?.versions['generation-vi']['x-y'].front_default || value?.sprites?.front_default || '/assets/icons/pokeball.png')
  }

 
  assingValueDescription(value: string): void{
    this.description = value;
  }

  getDescription(values: any ): string{    
    return values.find((desc: any) => desc.language.name === 'en').description;
  }

  getStatistics(value: any, id: number){
      return value.stats ? value.stats[id].base_stat : 0;
  }

  closeModal(): void{
    this.showGraph = false;
    this.close.emit(false);
  }
}
