import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/models/citas';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-citas-programadas',
  templateUrl: './citas-programadas.component.html',
  styleUrls: ['./citas-programadas.component.css'],
  providers: [CitasService],
})
export class CitasProgramadasComponent implements OnInit {
  listaCitasProgramadas: Cita[];

  days: string[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
  startTime = 9;
  endTime = 18;
  interval = 30;
  constructor(private _citasService: CitasService) {
    this.listaCitasProgramadas = [];
  }

  ngOnInit(): void {
    this._citasService.getCitasPorFechas(new Date(), new Date()).subscribe(
      (response) => {
        this.listaCitasProgramadas = response;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  getCellContent(day: string, time: string): Cita | null {
    const appointment = this.listaCitasProgramadas.find((cita) => {
      const citaDay = this.obtenerNombreDia(cita.fechaCita);
      const citaTime = cita.hora;
      return citaDay === day && citaTime === time;
    });
    return appointment ? appointment : null;
  }

  /**
   * Método para generar la hora en formato HH:mm.
   * @param hour Número de la hora.
   * @param minute Minutos (0 o 30).
   * @returns Hora en formato HH:mm.
   */
  formatTime(hour: number, minute: number): string {
    return `${hour.toString().padStart(2, '0')}:${minute === 0 ? '00' : '30'}`;
  }

  obtenerNombreDia(fecha: Date): string {
    const diasSemana: string[] = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];

    const dia: number = fecha.getDay();
    return diasSemana[dia];
  }
}
