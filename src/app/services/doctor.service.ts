import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Doctor } from '../models/doctor';

@Injectable()
export class DoctorService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  getDoctores(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + '/doctores', { headers: headers });
  }

  guardarDoctor(doctor: Doctor): Observable<any> {
    let params = JSON.stringify(doctor);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url + '/guardar-doctor', params, {
      headers: headers,
    });
  }

  getDoctor(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(this.url + '/doctor/' + id, { headers: headers });
  }

  actualizarDoctor(doctor: Doctor): Observable<any> {
    let params = JSON.stringify(doctor);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url + '/doctor/' + doctor._id, params, {
      headers: headers,
    });
  }

  deleteDoctor(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(this.url + '/doctor/' + id, { headers: headers });
  }
}