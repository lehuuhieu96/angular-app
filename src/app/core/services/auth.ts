import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

const USERS_KEY = 'users';
const TOKEN_KEY = 'access_token';
const CURRENT_USER = 'current_user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  private currentUser: any = null;

  constructor(private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(CURRENT_USER);
      this.currentUser = data ? JSON.parse(data) : null;
    }
  }

  //Check in brower
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
  // ===== USERS =====
  getUsers(): any[] {
    if (!this.isBrowser()) return [];
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }

  saveUsers(users: any[]) {
    if (!this.isBrowser()) return;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  // ===== REGISTER =====
  register(username: string, password: string) {
    const users = this.getUsers();

    if (users.find((u) => u.username === username)) {
      throw new Error('User already exists');
    }

    users.push({ username, password });
    this.saveUsers(users);
  }

  // ===== LOGIN =====
  login(username: string, password: string) {
    if (!this.isBrowser()) return;

    const users = this.getUsers();
    const user = users.find((u: any) => u.username === username && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const current = this.getCurrentUserFromStorage();
    const finalUser = {
      ...user,
      avatar: current?.username === user.username ? current.avatar : null,
    };

    this.setUser(finalUser);
    localStorage.setItem(TOKEN_KEY, 'fake-token');
    // localStorage.setItem(CURRENT_USER, JSON.stringify(user));
  }

  // ===== LOGOUT =====
  logout() {
    if (!this.isBrowser()) return;
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  // ===== AUTH CHECK =====
  isLoggedIn(): boolean {
    if (!this.isBrowser()) return false;
    return !!localStorage.getItem(TOKEN_KEY);
  }

  // ===== GET USER =====
  getUser() {
    if (this.isBrowser()) {
      this.currentUser = JSON.parse(localStorage.getItem(CURRENT_USER) || 'null');
    }
    return this.currentUser;
  }

  getCurrentUserFromStorage() {
    if (!this.isBrowser()) return null;
    return JSON.parse(localStorage.getItem(CURRENT_USER) || 'null');
  }

  setUser(user: any) {
    this.currentUser = user;
    if (this.isBrowser()) {
      //  chỉ lưu current_user
      localStorage.setItem(CURRENT_USER, JSON.stringify(user));
    }
  }

  // ===== GET TOKEN =====
  getToken() {
    if (!this.isBrowser()) return null;
    return localStorage.getItem(TOKEN_KEY);
  }
}
