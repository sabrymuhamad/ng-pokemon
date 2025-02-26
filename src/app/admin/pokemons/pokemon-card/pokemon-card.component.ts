import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IPokemonDetails } from '@pokemon/models';

@Component({
  selector: 'app-pokemon-card',
  imports: [RouterLink],
  templateUrl: './pokemon-card.component.html'
})
export class PokemonCardComponent {
  pokemon = input.required<IPokemonDetails>();
}
