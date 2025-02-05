import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-dashboard-perfil',
  templateUrl: './dashboard-perfil.component.html',
  styleUrls: ['./dashboard-perfil.component.css'],
})
export class DashboardPerfilComponent implements OnInit {
  doctorName: string = ''; // Nombre del doctor
  doctorId: string = ''; // ID del doctor
  appointments: any[] = []; // Lista de citas asignadas al doctor
  paginatedAppointments: any[] = []; // Lista de citas en la página actual
  selectedDate: Date | null = null; // Fecha seleccionada en el calendario
  currentPage = 1; // Página actual
  itemsPerPage = 6; // Número de citas por página
  totalPages = 1; // Total de páginas calculadas

  // Inyección de dependencias para HttpClient y Router
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Obtener el nombre y el ID del doctor desde localStorage
    const doctor = JSON.parse(localStorage.getItem('doctor') || '{}');
    this.doctorName = doctor.nombre || 'Usuario Anónimo';
    this.doctorId = doctor._id || '';

    // Si es necesario, cargar citas para la fecha actual al iniciar
    const today = new Date();
    this.selectedDate = today;
    this.getCitasPorDoctorYFecha();
  }

  // Método que maneja la selección de una fecha en el calendario
  onDateChange(date: Date): void {
    this.selectedDate = date;
    if (this.selectedDate) {
      this.getCitasPorDoctorYFecha();
    }
  }

  // Método para obtener las citas asignadas al doctor en una fecha específica
  getCitasPorDoctorYFecha(): void {
    if (!this.doctorId || !this.selectedDate) {
      console.error('El ID del doctor o la fecha seleccionada son inválidos.');
      return;
    }

    const formattedDate = this.selectedDate.toISOString().split('T')[0]; // Formatear fecha como YYYY-MM-DD
    const url =
      Global.url + `/citas-por-fecha/${this.doctorId}/${formattedDate}`;
    const token = localStorage.getItem('token');

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        this.appointments = response.citas || []; // Guardar todas las citas
        this.totalPages = Math.ceil(
          this.appointments.length / this.itemsPerPage
        ); // Calcular el total de páginas
        this.updatePaginatedAppointments(); // Actualizar las citas para la página actual
      },
      (error) => {
        console.error('Error al obtener citas por fecha:', error);
        this.appointments = [];
        this.paginatedAppointments = [];
        this.totalPages = 1;
      }
    );
  }

  // Actualizar las citas para la página actual
  updatePaginatedAppointments(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAppointments = this.appointments.slice(startIndex, endIndex);
  }

  // Métodos de paginación
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedAppointments();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedAppointments();
    }
  }

  // Redirige al componente de registro de citas
  addAppointment(): void {
    this.router.navigate(['/registro-cita']); // Redirige a la ruta 'registro-cita'
  }
  addAppointment2(): void {
    this.router.navigate(['/cita-detalle']); // Redirige a la ruta 'registro-cita'
  }
}
