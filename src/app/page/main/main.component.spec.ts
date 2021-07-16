import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonApiService } from 'src/app/services/api/pokemonApi.service';
import { PokemonService } from 'src/app/services/storage/pokemon.service';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [ 
        PokemonService, 
        PokemonApiService
      ]
    })
  })

  it('Should create the POPO APP', ()=> {
    let fixture = TestBed.createComponent(MainComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
