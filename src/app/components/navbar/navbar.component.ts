import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuActive = false;
  tipoUsuario: string | null = null;  // Guardará si es "paciente" o "doctor"

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Verifica el tipo de usuario en localStorage
    const user = localStorage.getItem('user') || localStorage.getItem('doctor');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.tipoUsuario = localStorage.getItem('user') ? 'paciente' : 'doctor';
    }
  }

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
