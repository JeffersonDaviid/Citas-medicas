import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
import { HorarioDisponibilidadService } from 'src/app/services/horario-disponibilidad.service';
import { Doctor } from 'src/app/models/doctor';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CitasService } from 'src/app/services/citas.service';
import { Cita } from 'src/app/models/citas';

@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.css'],
  providers: [DoctorService, HorarioDisponibilidadService, CitasService]
})
export class RegistroCitaComponent implements OnInit {
  registroCitaForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  doctoresDisponibles: Doctor[] = [];
  doctoresFiltrados: Doctor[] = [];
  especialidadesDisponibles: string[] = [];
  fechasDisponibles: string[] = [];
  horasDisponibles: string[] = [];
  minDate: string;
  maxDate: string ='';
  fechaDisabled: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private doctorService: DoctorService,
    private horarioService: HorarioDisponibilidadService,
    private userService: UserService,
    private citasService: CitasService
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    if (!this.userService.isAuthenticated()) {
      alert('Primero es necesario iniciar sesión para poder generar una cita.');
      this.router.navigate(['/login']);
      return;
    }

    this.registroCitaForm = this.fb.group({
      especialidad: ['', Validators.required],
      doctor: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      detalles: ['', Validators.required]
    });
    this.loadDoctores();
    this.registroCitaForm.get('fecha')?.disable();
  }

  serLimitesFecha() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.horarioService.getHorarios().subscribe(
      (response) => {
        const horarios = response.horarios;
        const maxDate = new Date(Math.max(...horarios.map((horario: any) => new Date(horario.dia).getTime())));
        this.maxDate = maxDate.toISOString().split('T')[0];
      },
      (error) => {
        console.error('Error al obtener horarios:', error);
      }
    );
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
    this.fechasDisponibles = [];
    this.registroCitaForm.get('fecha')?.disable();
  }

  onDoctorChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const doctorId = selectElement.value;
    this.horarioService.getHorarios().subscribe(
      (response) => {
        const horarios = response.horarios.filter((horario: any) => horario.doctor === doctorId);
        const fechasUnicas = [...new Set(horarios.map((horario: any) => horario.dia))];
        this.fechasDisponibles = fechasUnicas.map(fecha => this.formatFecha(fecha as string));
        const maxDate = new Date(Math.max(...fechasUnicas.map((fecha: any) => new Date(fecha).getTime())));
        this.maxDate = maxDate.toISOString().split('T')[0];
        this.fechaDisabled = false;
        this.registroCitaForm.get('fecha')?.enable();
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
        const horarios = response.horarios.filter((horario: any) => 
          horario.doctor === doctorId && 
          horario.dia === fechaSeleccionada && 
          horario.estado === 'disponible'
        );
        this.horasDisponibles = horarios.map((horario: any) => horario.hora);
        this.registroCitaForm.get('hora')?.setValue('');
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatFecha(fecha: string): string {
    const date = new Date(fecha);
    const dia = date.getUTCDate().toString().padStart(2, '0');
    const mes = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const anio = date.getUTCFullYear();
    return `${dia}-${mes}-${anio}`;
  }

  parseFecha(fecha: string): string {
    const [dia, mes, anio] = fecha.split('-');
    return `${anio}-${mes}-${dia}`;
  }

  registrarCita(formData: any): void {
    console.log('Iniciando registro de cita con datos:', formData);
    this.citasService.guardarCita(formData).subscribe(
      (response) => {
        console.log('Cita registrada con éxito', response);
        this.successMessage = 'Cita registrada exitosamente';
        this.errorMessage = '';
        this.actualizarHorario(formData.doctor, formData.fecha, formData.hora);
      },
      (error) => {
        console.error('Error al registrar la cita:', error);
        this.errorMessage = 'Error al registrar la cita';
        this.successMessage = '';
      }
    );
  }

  actualizarHorario(doctorId: string, fecha: string, hora: string): void {
    const dia = fecha;
    console.log(`Actualizando horario para el doctor ${doctorId} en el dia ${dia} a la hora ${hora}`);
    this.horarioService.getHorarios().subscribe(
      (response) => {
        console.log('Horarios obtenidos:', response.horarios);
        const horario = response.horarios.find((h: any) => h.doctor === doctorId && h.dia === dia && h.hora === hora);
        if (horario) {
          console.log('Horario encontrado:', horario);
          horario.estado = 'ocupado';
          this.horarioService.actualizarHorario(horario).subscribe(
            (res) => {
              console.log('Horario actualizado a ocupado', res);
            },
            (err) => {
              console.error('Error al actualizar el horario:', err);
            }
          );
        } else {
          console.error('No se encontró el horario para actualizar.');
        }
      },
      (error) => {
        console.error('Error al obtener horarios:', error);
      }
    );
  }
  onSubmit(): void {
    if (this.registroCitaForm.valid) {
      const formData = this.registroCitaForm.value;
      const currentUser = this.userService.getCurrentUser();
      if (currentUser) {
        formData.cedulaPaciente = currentUser.cedula;
        formData.fechaRegistro = new Date();
        formData.fechaCita = this.parseFecha(formData.fecha);
        console.log('Formulario válido, enviando datos...', formData);
        this.registrarCita(formData);
      } else {
        console.error('No se pudo obtener el usuario actual.');
      }
    } else {
      console.error('Formulario inválido:', this.registroCitaForm);
    }
  }

  verificarFormulario(): void {
    console.log('Estado del formulario:', this.registroCitaForm);
    console.log('Datos del formulario:', this.registroCitaForm.value);
  }

  closeModal(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.registroCitaForm.reset({
      especialidad: '',
      doctor: '',
      fecha: '',
      hora: '',
      detalles: ''
    });
  }
}