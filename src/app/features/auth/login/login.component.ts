import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';

@Component({
  standalone: true,
  imports: [FormsModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  login() {
    if (this.form.invalid) return;
    try {
      const { username, password } = this.form.value;
      this.auth.login(username || '', password || '');
      this.router.navigate(['/home']);
    } catch (e: any) {
      alert('Tên Hoặc Mật Khẩu Không Đúng!');
    }
  }
}
