import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { PokemonService } from '@pokemon/services';
import { IApiResponse, IPokemonDetails } from '@pokemon/models';
import { PokeListComponent } from './poke-list.component';
import { ActivatedRoute } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('PokeListComponent', () => {
    let component: PokeListComponent;
    let fixture: ComponentFixture<PokeListComponent>;
    let mockPokemonService: jasmine.SpyObj<PokemonService>;

    beforeEach(async () => {
        mockPokemonService = jasmine.createSpyObj('PokemonService', ['getPokemonList', 'getPokemonDetails']);

        await TestBed.configureTestingModule({
            imports: [PokeListComponent],
            providers: [
                { provide: PokemonService, useValue: mockPokemonService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: '1' })
                    }
                },
                provideAnimationsAsync()
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(PokeListComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch and display Pokemon list', fakeAsync(() => {
        const mockPokemonList: IApiResponse<{ name: string; url: string }[]> = {
            count: 200,
            next: 'nextPageApiUrl',
            previous: null,
            results: [
                { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
                { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' }
            ]
        };

        const mockPokemonDetails: IPokemonDetails = {
            name: 'bulbasaur',
            sprites: { front_default: 'bulbasaur.png' }
        } as any;


        mockPokemonService.cache = signal<IPokemonDetails[]>( [
            { name: 'bulbasaur', sprites: { front_default: 'bulbasaur.png' } },
            { name: 'charmander', sprites: { front_default: 'charmander.png' } }
        ] as any) as any;

        mockPokemonService.getPokemonList.and.returnValue(of(mockPokemonList));
        mockPokemonService.getPokemonDetails.and.returnValue(of(mockPokemonDetails));

        component.getPokeList();
        tick();
        fixture.detectChanges();

        expect(component.pokemonList.length).toBe(4);
        expect(component.pokemonList[0].name).toBe('bulbasaur');
        expect(component.pokemonList[0].sprites.front_default).toBe('bulbasaur.png');
    }));


    it('should generate correct page name', () => {
        component.pokemonList = [{ name: 'pikachu' } as any, { name: 'bulbasaur' } as any];
        component.totalElements = 150;
        component.generatePageName();
        expect(component.pageName).toBe('Pokemon List (2 / 150)');
    });

    it('should filter Pokémon list based on search keyword', () => {
        component.pokemonList = [
            { name: 'pikachu', hidden: false } as any,
            { name: 'bulbasaur', hidden: false } as any
        ];

        component.searchKeyword = 'pika';
        component.applyFilter();

        expect(component.pokemonList[0].hidden).toBe(false);
        expect(component.pokemonList[1].hidden).toBe(true);
    });

    it('should reset filter when search is cleared', () => {
        component.pokemonList = [
            { name: 'pikachu', hidden: true } as any,
            { name: 'bulbasaur', hidden: true } as any
        ];

        component.searchKeyword = '';
        component.applyFilter();

        expect(component.pokemonList.every(p => p.hidden === false)).toBeTrue();
    });

    it('should load more Pokémon on scroll', fakeAsync(() => {
        component.totalElements = 200;
        component.pokemonList = [{ name: 'pikachu' } as any];
        component.pagination = { limit: 100, offset: 0 };

        spyOn(component, 'getPokeList');

        component.loadMorePokes();
        tick();

        expect(component.pagination.offset).toBe(100);
        expect(component.getPokeList).toHaveBeenCalled();
    }));

    it('should not load more if all Pokémon are loaded', fakeAsync(() => {
        component.totalElements = 1;
        component.pokemonList = [{ name: 'pikachu' } as any];

        spyOn(component, 'getPokeList');

        component.loadMorePokes();
        tick();

        expect(component.getPokeList).not.toHaveBeenCalled();
    }));
});
