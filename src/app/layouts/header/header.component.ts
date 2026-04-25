import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.html',
})
export class HeaderComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
