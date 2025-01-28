import { Component, OnInit } from '@angular/core';
import { HorarioDisponibilidadService } from 'src/app/services/horario-disponibilidad.service';
import { HorarioDisponibilidad } from 'src/app/models/horario-disponibilidad';

@Component({
  selector: 'app-horario-disponible',
  templateUrl: './horario-disponible.component.html',
  styleUrls: ['./horario-disponible.component.css'],
  providers: [HorarioDisponibilidadService],
})
export class HorarioDisponibleComponent implements OnInit {
  horarios: HorarioDisponibilidad[] = [];

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
  }
}