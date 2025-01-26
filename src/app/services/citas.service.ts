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

  getCitasPorFechas(dateFrom: Date, dateTo: Date): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // return this._http.get(this.url + '/cita/' + dateFrom + '/' + dateTo, {
    //   headers: headers,
    // });

    // fake response data for testing
    return new Observable((observer) => {
      observer.next([
        {
          _id: '1',
          paciente: 'Paciente 1',
          detalles: 'Detalles 1',
          hora: '10:00',
          fechaRegistro: new Date(),
          fechaCita: new Date('2025-1-20'),
        },
        {
          _id: '2',
          paciente: 'Paciente 2',
          detalles: 'Detalles 2',
          hora: '11:00',
          fechaCita: new Date(),
          fechaRegistro: new Date(),
        },
        {
          _id: '3',
          paciente: 'Paciente 3',
          detalles: 'Detalles 3',
          hora: '12:00',
          fechaRegistro: new Date('2025-01-21T12:00:00'),
          fechaCita: new Date('2025-1-21'),
        },
        {
          _id: '4',
          paciente: 'Paciente 4',
          detalles: 'Detalles 4',
          hora: '13:00',
          fechaRegistro: new Date(),
          fechaCita: new Date('2025-1-21'),
        },
        {
          _id: '5',
          paciente: 'Paciente 5',
          detalles: 'Detalles 5',
          hora: '14:00',
          fechaRegistro: new Date(),
          fechaCita: new Date('2025-1-22'),
        },
        {
          _id: '6',
          paciente: 'Paciente 6',
          detalles: 'Detalles 6',
          hora: '15:00',
          fechaRegistro: new Date(),
          fechaCita: new Date('2025-1-23'),
        },
        {
          _id: '7',
          paciente: 'Paciente 7',
          detalles: 'Detalles 7',
          hora: '16:00',
          fechaCita: new Date('2025-1-22'),
          fechaRegistro: new Date(),
        },
        {
          _id: '8',
          paciente: 'Paciente 8',
          detalles: 'Detalles 8',
          hora: '17:00',
          fechaRegistro: new Date(),
          fechaCita: new Date('2025-1-23'),
        },
      ]);
    });
  }
}
