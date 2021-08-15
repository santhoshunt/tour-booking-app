import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn: boolean;

  constructor(private router: Router) {
    this.isLoggedIn = false;
  }

  login() {
    this.isLoggedIn = true;
    this.router.navigateByUrl('/places/tabs/discover');
  }

  logout() {
    this.isLoggedIn = false;
  }

  userIsAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
