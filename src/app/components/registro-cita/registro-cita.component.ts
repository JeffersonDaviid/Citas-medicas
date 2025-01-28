import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
import { HorarioDisponibilidadService } from 'src/app/services/horario-disponibilidad.service';
import { Doctor } from 'src/app/models/doctor';

@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.css'],
  providers: [DoctorService, HorarioDisponibilidadService]
})
export class RegistroCitaComponent implements OnInit {
  registroCitaForm!: FormGroup;
  doctoresDisponibles: Doctor[] = [];
  doctoresFiltrados: Doctor[] = [];
  especialidadesDisponibles: string[] = [];
  horasDisponibles: string[] = [];
  fechasDisponibles: string[] = [];
  minDate: string;

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private horarioService: HorarioDisponibilidadService
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.registroCitaForm = this.fb.group({
      especialidad: ['', Validators.required],
      doctor: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      detalles: ['', Validators.required]
    });

    this.loadDoctores();
  }

  loadDoctores(): void {
    this.doctorService.getDoctores().subscribe(
      (response) => {
        this.doctoresDisponibles = response.doctores;
        this.especialidadesDisponibles = [...new Set(this.doctoresDisponibles.map(doc => doc.especialidad))];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onEspecialidadChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const especialidad = selectElement.value;
    if (especialidad) {
      this.doctoresFiltrados = this.doctoresDisponibles.filter(doc => doc.especialidad === especialidad);
    } else {
      this.doctoresFiltrados = [];
    }
    this.registroCitaForm.get('doctor')?.setValue('');
    this.registroCitaForm.get('fecha')?.setValue('');
    this.registroCitaForm.get('hora')?.setValue('');
    this.horasDisponibles = [];
    this.fechasDisponibles = [];
  }

  onDoctorChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const doctorId = selectElement.value;
    this.horarioService.getHorarios().subscribe(
      (response) => {
        const horarios = response.horarios.filter((horario: any) => horario.doctor === doctorId);
        this.fechasDisponibles = [...new Set(horarios.map((horario: any) => horario.fecha as string))] as string[];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFechaChange(event: Event): void {
    const selectElement = event.target as HTMLInputElement;
    const fechaSeleccionada = selectElement.value;
    const doctorId = this.registroCitaForm.get('doctor')?.value;
    this.horarioService.getHorarios().subscribe(
      (response) => {
        const horarios = response.horarios.filter((horario: any) => horario.doctor === doctorId && horario.fecha === fechaSeleccionada);
        this.horasDisponibles = horarios.map((horario: any) => horario.hora);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatFecha(fecha: string): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    if (isNaN(date.getTime())) return '';
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const diaSemana = diasSemana[date.getDay()];
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear();
    return `${diaSemana} ${dia}-${mes}-${anio}`;
  }

  onSubmit(): void {
    if (this.registroCitaForm.valid) {
      const formData = this.registroCitaForm.value;
      console.log('Formulario válido, enviando datos...', formData);
      // Lógica para enviar los datos del formulario
    }
  }
}