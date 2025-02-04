import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-perfil',
  templateUrl: './dashboard-perfil.component.html',
  styleUrls: ['./dashboard-perfil.component.css'],
})
export class DashboardPerfilComponent implements OnInit {
  patients = [
    {
      id: 10,
      name: 'Martín Castillo',
      age: 37,
      gender: 'Masculino',
      contact: '099-012-3456',
    },
    {
      id: 11,
      name: 'Sofía Herrera',
      age: 31,
      gender: 'Femenino',
      contact: '098-123-4567',
    },
    {
      id: 12,
      name: 'Diego Ramírez',
      age: 40,
      gender: 'Masculino',
      contact: '097-234-5678',
    }
  ];
  currentPage = 1;
  totalPages = 2;

  // Fecha seleccionada
  selectedDate: Date | null = null;
  // Citas cargadas desde el backend
  appointments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onLogout(): void {
    console.log('Cerrar sesión');
  }

  // Método que maneja la selección de la fecha en el calendario
  onDateChange(date: Date): void {
    this.selectedDate = date;
    console.log('Fecha seleccionada:', date);
    // Lógica para filtrar pacientes por fecha.
    // Llama al backend para obtener las citas del día seleccionado
    this.getCitasPorFecha(this.selectedDate);
  }

  // Método para obtener las citas del día desde el backend
  getCitasPorFecha(date: Date): void {
    const formattedDate = date.toISOString().split('T')[0]; // Formatea la fecha como YYYY-MM-DD
    this.http.get(`http://localhost:3600/citas-por-fecha?fecha=${formattedDate}`).subscribe(
      (response: any) => {
        this.appointments = response.citas; // Asigna las citas recibidas
        console.log('Citas para la fecha seleccionada:', this.appointments);
      },
      (error) => {
        console.error('Error al obtener citas:', error);
      }
    );
  }
  

  addAppointment(): void {
    console.log('Registrar cita');
  }

  viewPatient(id: number): void {
    console.log('Ver detalles del paciente:', id);
  }

  previousPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }
}
