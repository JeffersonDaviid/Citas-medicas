import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.component.html',
  styleUrls: ['./recuperar-contrasena.component.css'],
})
export class RecuperarContrasenaComponent {
  public url: string;
  recoverForm: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      securityAnswer: ['', Validators.required],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
    });
    this.url = Global.url;
  }

  onSubmit() {
    this.submitted = true;
    if (this.recoverForm.invalid) return;

    const requestData = this.recoverForm.value;

    this.http
      .post(this.url + '/api/usuarios/recover-password', requestData)
      .subscribe({
        next: (response: any) => {
          this.successMessage = response.message;
          this.errorMessage = '';
          // Redirigir a la pantalla de inicio de sesión después de 5 segundos
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 5000);
        },
        error: (err) => {
          this.errorMessage =
            err.error.message || 'Error al recuperar la contraseña';
          this.successMessage = '';
        },
      });
  }
}
