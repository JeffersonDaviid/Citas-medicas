import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3600/api/usuarios';

  constructor(private http: HttpClient) {}

  register(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, usuario);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  recoverPassword(email: string, securityAnswer: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recover-password`, {
      email,
      securityAnswer,
    });
  }
}
