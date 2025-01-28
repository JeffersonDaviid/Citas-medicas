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
    const startDate = '2025-01-20';
    const endDate = '2025-01-26';

    this._citasService
      .getCitasPorFechas(this.formatDate(startDate), this.formatDate(endDate))
      .subscribe(
        (response) => {
          this.listaCitasProgramadas = response;
          console.log(this.listaCitasProgramadas);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getCellContent(day: string, time: string): Cita | null {
    const appointment = this.listaCitasProgramadas.find((cita) => {
      const citaDay = this.obtenerNombreDia(new Date(cita.fechaCita));
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
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];

    const dia: number = fecha.getDay();
    return diasSemana[dia];
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Asegura 2 dígitos
    const day = String(d.getDate()).padStart(2, '0'); // Asegura 2 dígitos
    return `${year}-${month}-${day}`;
  }
}
