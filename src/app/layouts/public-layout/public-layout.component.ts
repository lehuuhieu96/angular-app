import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-public-layout',
  imports: [RouterOutlet],
  template: `
    <div style="display:flex; justify-content:center; margin-top:100px;">
      <div style="width:300px;">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
})
export class PublicLayoutComponent {}
