import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeDetailsComponent } from './poke-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PokemonService } from '@pokemon/services';

describe('PokeDetailsComponent', () => {
  let component: PokeDetailsComponent;
  let fixture: ComponentFixture<PokeDetailsComponent>;
  let mockPokemonService: jasmine.SpyObj<PokemonService>;

  beforeEach(async () => {
    mockPokemonService = jasmine.createSpyObj('PokemonService', ['getPokemonById']);

    await TestBed.configureTestingModule({
      imports: [PokeDetailsComponent],
      providers: [
        { provide: PokemonService, useValue: mockPokemonService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => (key === 'id' ? '1' : null) })
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

});
