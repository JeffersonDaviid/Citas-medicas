import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = ''; // Mensaje general de error

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Datos enviados al backend:', { email, password }); // Agregar log aquí
  
      this.userService.login(email, password).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);
          localStorage.setItem('token', response.token); // Guardar el token en el localStorage
          localStorage.setItem('currentUser', JSON.stringify(response.user)); // Guardar el usuario en el localStorage
          // Redirige al dashboard o similar
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          this.errorMessage = err.error?.message || 'Correo o contraseña incorrectos';
        },
      });
    }
  }  
}
