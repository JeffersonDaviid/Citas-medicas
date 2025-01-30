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
  public fechaInicioSeleccionada: string = '';
  public fechaFinSeleccionada: string = '';
  public fechasRango: string[] = []; 
  public horasDisponibles: string[] = ['07:00', '08:00', '09:00', '10:00', '11:00'];
  buscoHorarios: boolean = false;
  mostrarMensajeValidacion: boolean = false;
  minFechaHoy: string = '';
  maxFechaLimite: string='';

  constructor(
    private _horarioService: HorarioDisponibilidadService,
    private _doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    this._horarioService.getHorarios().subscribe(
      (response) => {
        this.horarios = response.horarios;
      },
      (error) => {
        console.log(error);
      }
    );

    this.getHorario();
    this.obtenerDoctores();
    this.serLimitesFecha();
  }

  getHorario(): void {
    if (!this.doctorSeleccionado || !this.fechaInicioSeleccionada || !this.fechaFinSeleccionada) {
      this.mostrarMensajeValidacion = true;
      console.warn('Debe seleccionar un doctor y rango de fechas.');
      return;
    }

    let fechaInicioFormateada = this.formatearFecha(this.fechaInicioSeleccionada);
    let fechaFinFormateada = this.formatearFecha(this.fechaFinSeleccionada);
    this.fechasRango = this.calcularRangoFechas(this.fechaInicioSeleccionada, this.fechaFinSeleccionada);

    this._horarioService.getHorario(this.doctorSeleccionado, fechaInicioFormateada, fechaFinFormateada).subscribe(
      (data) => {
        console.log('Datos recibidos del backend', JSON.stringify(data,null,2));
        this.horarios = data;
      },
      (error) => {
        console.error('Error al obtener horarios:', error);
        this.horarios = [];
      }
    );
    this.mostrarMensajeValidacion = false;
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
  formatearFecha(fecha: string): string {
    return formatDate(fecha, 'yyyy-MM-dd', 'en-US');
  }

  serLimitesFecha() {
    const today = new Date();
    this.minFechaHoy = today.toISOString().split('T')[0];

    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);
    this.maxFechaLimite = maxDate.toISOString().split('T')[0];
  }
  calcularRangoFechas(fechaInicio: string, fechaFin: string): string[] {
    let fechas = [];
    let actual = new Date(fechaInicio);
    let fin = new Date(fechaFin);

    while (actual <= fin) {
      fechas.push(actual.toISOString().split('T')[0]);
      actual.setDate(actual.getDate() + 1);
    }

    return fechas;
  }

  getEstadoHorario(fecha: string, hora: string): string {
    let horarioEncontrado = this.horarios.find(h => h.fecha === fecha && h.hora === hora);
    return horarioEncontrado ? horarioEncontrado.estado : 'No Disponible';
  }
  
}