import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  menuActive = false;
  tipoUsuario: string | null = null; // Guardará si es "paciente" o "doctor"

  constructor(public userService: UserService, private router: Router) {}

  ngDoCheck(): void {
    if (localStorage.getItem('user')) this.tipoUsuario = 'paciente';
    else if (localStorage.getItem('doctor')) this.tipoUsuario = 'doctor';
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  logout() {
    localStorage.clear();
    this.userService.logout();
    this.router.navigate(['/inicio']);
  }
}
