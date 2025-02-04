import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Global } from './global';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public url: string;

  private apiUsuariosUrl = '/api/usuarios';
  private apiDoctoresUrl = '/api/doctores';
  private currentUser: Usuario | null = null;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  register(usuario: any): Observable<any> {
    return this._http.post(
      `${this.url + this.apiUsuariosUrl}/register`,
      usuario
    );
  }

  login(email: string, password: string, tipoUsuario: string): Observable<any> {
    return this._http
      .post(
        `${
          tipoUsuario === 'doctor'
            ? this.url + this.apiDoctoresUrl
            : this.url + this.apiUsuariosUrl
        }/login`,
        { email, password }
      )
      .pipe(
        tap((response: any) => {
          if (tipoUsuario === 'paciente' && response.token) {
            // Solo para pacientes: almacenar el token
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response.user));
          } else if (tipoUsuario === 'doctor' && response.doctor) {
            // Para doctores: almacenar solo la información del doctor
            localStorage.setItem(
              'currentUser',
              JSON.stringify(response.doctor)
            );
          } else {
            console.error('Respuesta inesperada del servidor:', response);
          }
        })
      );
  }

  recoverPassword(email: string, securityAnswer: string): Observable<any> {
    return this._http.post(
      `${this.url + this.apiUsuariosUrl}/recover-password`,
      {
        email,
        securityAnswer,
      }
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): Usuario | null {
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        return JSON.parse(user);
      } catch (error) {
        console.error('Error al parsear el usuario almacenado:', error);
        return null;
      }
    }
    return null;
  }
}
