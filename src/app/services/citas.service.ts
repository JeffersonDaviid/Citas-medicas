import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Cita } from '../models/citas';

@Injectable()
export class CitasService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getCitas(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + '/citas', { headers: headers });
  }

  guardarCita(cita: Cita): Observable<any> {
    let params = JSON.stringify(cita);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + '/guardar-cita', params, {
      headers: headers,
    });
  }

  getCita(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + '/cita/' + id, { headers: headers });
  }

  actualizarCita(cita: Cita): Observable<any> {
    let params = JSON.stringify(cita);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + '/cita/' + cita._id, params, {
      headers: headers,
    });
  }

  deleteLibro(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url + '/libro/' + id, { headers: headers });
  }

  getCitasPorFechas(dateFrom: string, dateTo: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + '/citas/' + dateFrom + '/' + dateTo, {
      headers: headers,
    });
  }
}
