import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cita } from 'src/app/models/citas';
import { Paciente } from 'src/app/models/paciente';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-cita-detalle',
  templateUrl: './cita-detalle.component.html',
  styleUrls: ['./cita-detalle.component.css'],
  providers: [CitasService],
})
export class CitaDetalleComponent implements OnInit {
  citaId = '';
  cedulaPaciente = '';
  cita?: Cita;
  paciente?: Paciente;
  constructor(
    private _thisRoute: ActivatedRoute,
    private _citaService: CitasService
  ) {}

  ngOnInit(): void {
    this._thisRoute.params.subscribe((params) => {
      this.citaId = params['id'];
    });

    this._citaService.getCita(this.citaId).subscribe(
      (response) => {
        this.cita = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
