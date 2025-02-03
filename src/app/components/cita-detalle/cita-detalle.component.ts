import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cita, CitaDetalles } from 'src/app/models/citas';
import { CitasService } from 'src/app/services/citas.service';

@Component({
  selector: 'app-cita-detalle',
  templateUrl: './cita-detalle.component.html',
  styleUrls: ['./cita-detalle.component.css'],
  providers: [CitasService],
})
export class CitaDetalleComponent implements OnInit {
  citaId = '';
  cita?: CitaDetalles;
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
