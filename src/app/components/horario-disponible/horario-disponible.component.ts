import { Component, OnInit } from '@angular/core';
import { HorarioDisponibilidadService } from 'src/app/services/horario-disponibilidad.service';
import { HorarioDisponibilidad } from 'src/app/models/horario-disponibilidad';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-horario-disponible',
  templateUrl: './horario-disponible.component.html',
  styleUrls: ['./horario-disponible.component.css'],
  providers: [HorarioDisponibilidadService],
})
export class HorarioDisponibleComponent implements OnInit {
  horarios: HorarioDisponibilidad[] = [];
  public doctores: string[] = []; 
  public doctorSeleccionado: string = '';
  public fechaSeleccionada: string = '';
  buscoHorarios: boolean = false;
  mostrarMensajeValidacion: boolean = false;
  minFechaHoy: string = '';

  constructor(private _horarioService: HorarioDisponibilidadService) {}

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
    this.setMinFechaHoy();
  }

  getHorario(): void {
    if (!this.doctorSeleccionado || !this.fechaSeleccionada) {
      this.mostrarMensajeValidacion = true;
      console.warn('Debe seleccionar un doctor y una fecha.');
      return;
    }

    let fechaFormateada = this.formatearFecha(this.fechaSeleccionada);
    
    this._horarioService.getHorario(this.doctorSeleccionado, fechaFormateada).subscribe(
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
    this._horarioService.getDoctores().subscribe(
      (data) => {
        this.doctores = data;
      },
      (error) => {
        console.error('Error al obtener la lista de doctores:', error);
      }
    );
  }
  formatearFecha(fecha: string): string {
    return formatDate(fecha, 'yyyy-MM-dd', 'en-US');
  }
  setMinFechaHoy() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.minFechaHoy = `${year}-${month}-${day}`;
  }
  
}