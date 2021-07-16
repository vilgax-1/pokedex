import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonApiService } from 'src/app/services/api/pokemonApi.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @Input() dataPokemon = {} as Pokemon;
  @Input() id: number = 0;
  details$ = new Observable<{}>();

  @Output() sendPkInformation = new EventEmitter();

  constructor(
    private apiPk: PokemonApiService,
    private satinize: DomSanitizer
  ) {}

  ngOnInit(): void {    
    this.getDetails();
  } 

  getDetails(): void{    
    this.details$ = this.dataPokemon.hasOwnProperty('url') ? this.apiPk.getDetailsPokemon(this.dataPokemon.url) : new BehaviorSubject<any>(this.dataPokemon).asObservable();
  }

  openInformation(value: any): void {
    this.sendPkInformation.emit(value);
  }

  getImageSvg(value: any){    
    return this.satinize.bypassSecurityTrustUrl(value.sprites.versions['generation-vi']['x-y'].front_default || value.sprites.front_default || '/assets/icons/pokeball.png');
  }
}
