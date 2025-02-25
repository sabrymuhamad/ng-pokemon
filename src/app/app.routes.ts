import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'admin', loadChildren: () => import('./admin/admin.routes') },
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
];
