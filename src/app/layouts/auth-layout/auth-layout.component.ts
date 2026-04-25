import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  standalone: true,
  selector: 'app-auth-layout',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>

    <div style="padding: 20px;">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AuthLayoutComponent {}
