import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { PokemonService  } from '../../services/storage/pokemon.service';
import { PokemonApiService } from 'src/app/services/api/pokemonApi.service';

describe('ModalComponent', () => {
  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [ 
        PokemonService, 
        PokemonApiService
      ]
    })
  })

  it('Should create the POPO APP', ()=> {
    let fixture = TestBed.createComponent(ModalComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
