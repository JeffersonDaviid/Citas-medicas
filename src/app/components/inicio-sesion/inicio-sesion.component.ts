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
  errorMessage: string = '';  // Mensaje general de error

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      tipoUsuario: ['paciente', Validators.required],  // Valor predeterminado como paciente
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password, tipoUsuario } = this.loginForm.value;

      this.userService.login(email, password, tipoUsuario).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso', response);

          if (response.user || response.doctor) {
            // Guardar datos en localStorage según el tipo de usuario
            if (tipoUsuario === 'paciente') {
              localStorage.setItem('user', JSON.stringify(response.user));
              localStorage.setItem('token', response.token);  // Solo pacientes usan token
              this.router.navigate(['/registro-cita']);
            } else if (tipoUsuario === 'doctor') {
              localStorage.setItem('doctor', JSON.stringify(response.doctor));
              this.router.navigate(['/perfil']);
            }
          } else {
            this.errorMessage = 'Respuesta incompleta del servidor. Por favor, inténtelo de nuevo.';
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          this.errorMessage = err.error?.message || 'Error al ingresar. Verifica los datos.';
        },
      });
    }
  }
}
