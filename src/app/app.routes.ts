import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'loading', pathMatch: 'full' },
  {
    path: 'loading',
    loadComponent: () => import('./loading/loading').then((m) => m.Loading),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  { path: '**', redirectTo: 'home' },
];
