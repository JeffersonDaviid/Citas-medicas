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
    // src/app/components/inicio-sesion/inicio-sesion.component.ts
if (this.loginForm.valid) {
  const { email, password } = this.loginForm.value;
  console.log('Datos enviados al backend:', { email, password });

  this.userService.login(email, password).subscribe({
    next: (response) => {
      console.log('Inicio de sesión exitoso', response);
      if (response.user) {
        localStorage.setItem('token', response.token); // Guardar el token en el localStorage
        localStorage.setItem('currentUser', JSON.stringify(response.user)); // Guardar el usuario en el localStorage
        console.log(localStorage.getItem('currentUser'));
        // Redirige al dashboard o similar
        this.router.navigate(['/dashboard']);
      } else {
        console.error('Usuario no definido en la respuesta:', response);
      }
    },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.errorMessage = err.error?.message || 'Correo o contraseña incorrectos';
        },
      });
    }
  }  
}
