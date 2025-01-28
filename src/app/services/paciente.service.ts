import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Paciente } from '../models/paciente';

@Injectable()
export class PacienteService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getPacientes(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + '/pacientes', { headers: headers });
  }

  guardarPaciente(paciente: Paciente): Observable<any> {
    let params = JSON.stringify(paciente);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + '/guardar-paciente', params, {
      headers: headers,
    });
  }

  getPaciente(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + '/paciente/' + id, { headers: headers });
  }

  actualizarPaciente(paciente: Paciente): Observable<any> {
    let params = JSON.stringify(paciente);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + '/paciente/' + paciente._id, params, {
      headers: headers,
    });
  }

  deletePaciente(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url + '/paciente/' + id, { headers: headers });
  }
}