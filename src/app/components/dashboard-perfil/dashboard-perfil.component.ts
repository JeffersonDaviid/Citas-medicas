import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-perfil',
  templateUrl: './dashboard-perfil.component.html',
  styleUrls: ['./dashboard-perfil.component.css'],
})
export class DashboardPerfilComponent implements OnInit {
  patients = [
    {
      id: 1,
      name: 'Paciente 1',
      age: 35,
      gender: 'Masculino',
      contact: '123-456-7890',
    },
    {
      id: 2,
      name: 'Paciente 2',
      age: 42,
      gender: 'Femenino',
      contact: '987-654-3210',
    },
    {
      id: 2,
      name: 'Paciente 2',
      age: 42,
      gender: 'Femenino',
      contact: '987-654-3210',
    },
    {
      id: 2,
      name: 'Paciente 2',
      age: 42,
      gender: 'Femenino',
      contact: '987-654-3210',
    },
    {
      id: 2,
      name: 'Paciente 2',
      age: 42,
      gender: 'Femenino',
      contact: '987-654-3210',
    },
    {
      id: 2,
      name: 'Paciente 2',
      age: 42,
      gender: 'Femenino',
      contact: '987-654-3210',
    },
    // Más datos...
  ];
  currentPage = 1;
  totalPages = 5;

  constructor() {}

  ngOnInit(): void {}

  onLogout(): void {
    console.log('Cerrar sesión');
  }

  onDateChange(date: Date): void {
    console.log('Fecha seleccionada:', date);
    // Lógica para filtrar pacientes por fecha.
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
