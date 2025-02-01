import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3600/api/usuarios';
  private currentUser: Usuario | null = null;

  constructor(private http: HttpClient) {}

  register(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        console.log('Respuesta del backend:', response);
        if (response.user && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
        } else {
          console.error('Respuesta incompleta del backend:', response);
        }
      })
    );
  }

  recoverPassword(email: string, securityAnswer: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recover-password`, {
      email,
      securityAnswer,
    });
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  // src/app/services/user.service.ts
getCurrentUser() {
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
