import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { PokemonService } from 'src/app/services/storage/pokemon.service';
import { gsap } from "gsap";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('pokeball') pokeball: any;
  
  pokemonSelected$ = new BehaviorSubject({});
  formSearchPokemon: FormGroup;
  pokemon$: Observable<any> = new Observable<any>();
  currentPage = 0;
  openModal = false;

  constructor(
    private spk: PokemonService,
    private fb: FormBuilder
  ) { 
    this.spk.searchPokemonByPage = 1;
    this.formSearchPokemon = this.fb.group({
      name: new FormControl('')
    })
  }
  
  ngOnInit(): void {
    this.checkChanges();
    this.pokemon$ = this.spk.getPokemonData;
  }

  checkChanges(): void{
    const formName = this.formSearchPokemon.get('name');
    combineLatest([
      formName?.valueChanges as Observable<any>
    ]).subscribe(name => {
      if(formName?.value){
        const t1 = gsap.timeline({});
        t1.to(this.pokeball?.nativeElement, { rotateZ: 360, translateX: '50px', duration: 4,  ease: 'elastic' })
          .to(this.pokeball?.nativeElement, { zIndex: 1 });
      }
    });
  }

  clearInput(): void{
    this.formSearchPokemon.get('name')?.setValue('');
    this.getPokemon(1);
  }

  searchByName(): void{
    const name = (this.formSearchPokemon.get('name')?.value)?.toLowerCase();
    if(name){
      this.spk.searchPokemonByName = name;
      this.currentPage = 1;
    }else{
      this.getPokemon(1);
    }
  }

  sendInformation(pkValue: any): void{
    this.openModal = true;
    this.pokemonSelected$.next(pkValue);
  }
  
  getPokemon(page: number): void{
    this.currentPage = page;
    this.spk.searchPokemonByPage = page;
  } 
}
