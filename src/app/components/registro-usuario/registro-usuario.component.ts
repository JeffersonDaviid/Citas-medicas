import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
})
export class RegistroUsuarioComponent implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$'),
          ],
        ],
        cedula: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        fechaNacimiento: ['', Validators.required],
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(
              '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        securityQuestion: ['', Validators.required],
        securityAnswer: ['', Validators.required],
        terms: [false, Validators.requiredTrue],
      },
      {
        validators: this.passwordsMatchValidator,
      }
    );
  }

  passwordsMatchValidator(form: FormGroup): null | { passwordsMismatch: boolean } {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  allowOnlyNumbers(event: KeyboardEvent): boolean {
    const charCode = event.key.charCodeAt(0);
    return charCode >= 48 && charCode <= 57; // Solo números (0-9)
  }

  allowOnlyLetters(event: KeyboardEvent): boolean {
    const charCode = event.key.charCodeAt(0);
    return (
      (charCode >= 65 && charCode <= 90) || // Letras mayúsculas
      (charCode >= 97 && charCode <= 122) || // Letras minúsculas
      charCode === 32 || // Espacio
      'áéíóúÁÉÍÓÚñÑ'.includes(event.key) // Caracteres especiales
    );
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      const usuario: Usuario = {
        nombre: formData.username,
        email: formData.email,
        password: formData.password,
        cedula: formData.cedula,
        fechaNacimiento: formData.fechaNacimiento,
        telefono: formData.telefono,
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.securityAnswer,
      };

      this.userService.register(usuario).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (error) => {
          this.errorMessage =
            error.error?.message || 'Error al registrar usuario';
        },
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/inicio']);
  }
}
