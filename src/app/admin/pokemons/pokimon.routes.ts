

import { Route } from '@angular/router';

export default [
    { path: 'list', loadComponent: () => import('./poke-list/poke-list.component').then(c => c.PokeListComponent) },
    { path: '', redirectTo: 'list', pathMatch: 'full' }
] satisfies Route[];