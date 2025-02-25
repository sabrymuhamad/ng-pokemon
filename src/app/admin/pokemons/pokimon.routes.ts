

import { Route } from '@angular/router';

export default [
    { path: 'list', loadComponent: () => import('./poke-list/poke-list.component').then(c => c.PokeListComponent) },
    { path: 'details/:id', loadComponent: () => import('./poke-details/poke-details.component').then(c => c.PokeDetailsComponent) },
    { path: '', redirectTo: 'list', pathMatch: 'full' }
] satisfies Route[];