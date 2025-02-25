import { Route } from '@angular/router';
import { AdminComponent } from './admin.component';

export default [
    {
        path: '', component: AdminComponent, children: [
            { path: 'pokemon', loadChildren: () => import('./pokemons/pokimon.routes') },
            { path: '', redirectTo: 'pokemon', pathMatch: 'full' }
        ]
    }
] satisfies Route[];