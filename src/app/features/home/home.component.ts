import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(
    private auth: AuthService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();
  }

  getInitial(): string {
    return this.user?.username?.charAt(0).toUpperCase() || '?';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      try {
        const base64 = reader.result as string;
        const updatedUser = {
          ...this.user,
          avatar: base64,
        };
        this.auth.setUser(updatedUser);
        this.user = this.auth.getUser();
        this.cd.detectChanges();
      } catch (err) {
        console.error('Upload error:', err);
      }
    };
    // QUAN TRỌNG: bắt lỗi
    reader.onerror = () => {
      console.error('FileReader error');
    };

    reader.readAsDataURL(file);
    // event.target.value = '';
  }

  logout() {
    this.auth.logout();
  }

  get userData() {
    return this.auth.getUser();
  }
}
