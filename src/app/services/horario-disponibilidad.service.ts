import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  getHorarioId(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + '/horario/' + id, { headers: headers });
  }
  
  //Horario con doctor y fecha
  getHorario(doctor: string, fecha: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = new HttpParams().set('doctor', doctor).set('fecha', fecha);

    return this._http.get(this.url + '/horarios', { headers, params }).pipe(
      map((response: any) => {
        return response.horarios; 
      })
    );
  }
  //para mostrar en el front
  getDoctores(): Observable<string[]> {
    return this._http.get<{ doctores: string[] }>(this.url + '/doctores').pipe(
      map(response => response.doctores)
    );
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