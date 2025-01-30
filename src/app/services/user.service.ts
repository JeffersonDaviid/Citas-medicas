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
    return this.http.post(`${this.apiUrl}/login`, { email, password });
    tap((response: any) => {
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
    });
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

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

}
