import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  menuActive = false;

  constructor(public userService: UserService, private router: Router) {}

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/inicio']);
  }
}