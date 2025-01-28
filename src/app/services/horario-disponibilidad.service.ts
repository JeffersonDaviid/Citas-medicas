import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global';
import { HorarioDisponibilidad } from '../models/horario-disponibilidad';

@Injectable()
export class HorarioDisponibilidadService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getHorarios(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + '/horarios', { headers: headers });
  }

  guardarHorario(horario: HorarioDisponibilidad): Observable<any> {
    let params = JSON.stringify(horario);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + '/guardar-horario', params, {
      headers: headers,
    });
  }

  getHorario(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + '/horario/' + id, { headers: headers });
  }

  actualizarHorario(horario: HorarioDisponibilidad): Observable<any> {
    let params = JSON.stringify(horario);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + '/horario/' + horario._id, params, {
      headers: headers,
    });
  }

  deleteHorario(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url + '/horario/' + id, { headers: headers });
  }
}