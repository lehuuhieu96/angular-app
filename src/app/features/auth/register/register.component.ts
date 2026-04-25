import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  form = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', [Validators.required]],
  });

  register() {
    if (this.form.invalid) return;
    const { password, confirm, username } = this.form.value;
    if (password !== confirm) {
      alert('Mật Khẩu Không Khớp');
      return;
    }
    try {
      this.auth.register(username || '', password || '');
      alert('Tạo Tài Khoản Thành Công!');
      this.router.navigate(['/login']);
    } catch (e: any) {
      alert(e.message);
    }
  }
}
