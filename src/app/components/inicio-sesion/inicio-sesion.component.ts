import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
})
export class InicioSesionComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm && this.loginForm.valid) {
      // Lógica para autenticar al usuario (servicio de autenticación, etc.)
      // Si la autenticación es exitosa, redirigir al dashboard o página principal:
      console.log('Formulario válido, enviar solicitud de autenticación...');
      this.router.navigate(['/dashboard']);
    }
  }
}
