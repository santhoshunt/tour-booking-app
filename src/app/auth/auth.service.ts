import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean;
  private userId: string;

  constructor(private router: Router) {
    this.isLoggedIn = true;
    this.userId = 'u1';
  }

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  userIsAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getUserId(): string {
    return this.userId;
  }
}
