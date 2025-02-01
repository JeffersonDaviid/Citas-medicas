import { Component, OnInit } from '@angular/core';
import { HorarioDisponibilidadService } from 'src/app/services/horario-disponibilidad.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { HorarioDisponibilidad } from 'src/app/models/horario-disponibilidad';
import { formatDate } from '@angular/common';
import { Doctor } from 'src/app/models/doctor';

@Component({
  selector: 'app-horario-disponible',
  templateUrl: './horario-disponible.component.html',
  styleUrls: ['./horario-disponible.component.css'],
  providers: [HorarioDisponibilidadService, DoctorService],
})
export class HorarioDisponibleComponent implements OnInit {
  horarios: HorarioDisponibilidad[] = [];
  public doctores: Doctor[] = [];
  public doctorSeleccionado: string = '';
  public diaInicioSeleccionada: string = '';
  public diaFinSeleccionada: string = '';
  public diasRango: string[] = [];
  public horasDisponibles: string[] = [];
  buscoHorarios: boolean = false;
  minDiaHoy: string = '';
  maxDiaLimite: string = '';

  constructor(
    private _horarioService: HorarioDisponibilidadService,
    private _doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this._horarioService.getHorarios().subscribe(
      (response) => {
        this.horarios = response.horarios;
      },
      (error) => {
        console.log(error);
      }
    );

    this.obtenerDoctores();
    this.serLimitesFecha();
    this.generarHorasDisponibles();
  }

  getHorario(): void {
    if (!this.doctorSeleccionado || !this.diaInicioSeleccionada || !this.diaFinSeleccionada) {
      alert('Por favor, seleccione un doctor y proporcione las fechas antes de buscar.');
      console.warn('Debe seleccionar un doctor y rango de fechas.');
      return;
    }

    let diaInicioFormateada = this.formatearFecha(this.diaInicioSeleccionada);
    let diaFinFormateada = this.formatearFecha(this.diaFinSeleccionada);
    this.diasRango = this.calcularRangoFechas(this.diaInicioSeleccionada, this.diaFinSeleccionada);

    this._horarioService.getHorario(this.doctorSeleccionado, diaInicioFormateada, diaFinFormateada).subscribe(
      (data) => {
        console.log('Datos recibidos del backend', JSON.stringify(data, null, 2));
        this.horarios = data;
      },
      (error) => {
        console.error('Error al obtener horarios:', error);
        this.horarios = [];
      }
    );
    this.buscoHorarios = true;
  }

  obtenerDoctores(): void {
    this._doctorService.getDoctores().subscribe(
      (response) => {
        this.doctores = response.doctores;
      },
      (error) => {
        console.error('Error al obtener la lista de doctores:', error);
      }
    );
  }
  formatearFecha(dia: string): string {
    return formatDate(dia, 'yyyy-MM-dd', 'en-US');
  }

  serLimitesFecha() {
    const today = new Date();
    this.minDiaHoy = today.toISOString().split('T')[0];

    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);
    this.maxDiaLimite = maxDate.toISOString().split('T')[0];
  }
  calcularRangoFechas(diaInicio: string, diaFin: string): string[] {
    let fechas = [];
    let actual = new Date(diaInicio);
    let fin = new Date(diaFin);

    while (actual <= fin) {
      fechas.push(actual.toISOString().split('T')[0]);
      actual.setDate(actual.getDate() + 1);
    }

    return fechas;
  }

  getEstadoHorario(dia: string, hora: string): string {
    let horarioEncontrado = this.horarios.find(h => h.dia === dia && h.hora === hora);
    return horarioEncontrado ? horarioEncontrado.estado : 'No Disponible';
  }

  private generarHorasDisponibles(): void {
    const inicio = 8 * 60;
    const fin = 16 * 60;
    const intervalo = 30; 

    for (let tiempo = inicio; tiempo <= fin; tiempo += intervalo) {
      const horas = Math.floor(tiempo / 60);
      const minutos = tiempo % 60;
      this.horasDisponibles.push(`${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`);
    }
  }

}