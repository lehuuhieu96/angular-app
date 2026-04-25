import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  // 👉 Public layout
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout.component').then(
        (m) => m.PublicLayoutComponent,
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
      },
    ],
  },

  // 👉 Auth layout
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
      },
    ],
  },
];
