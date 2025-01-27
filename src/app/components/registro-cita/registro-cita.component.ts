import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-cita',
  templateUrl: './registro-cita.component.html',
  styleUrls: ['./registro-cita.component.css']
})
export class RegistroCitaComponent implements OnInit {
  registroCitaForm!: FormGroup;
  doctoresDisponibles = [
    { id: 1, nombre: 'Dr. Juan Pérez' },
    { id: 2, nombre: 'Dra. María López' }
  ];
  horasDisponibles = ['09:00', '10:00', '11:00', '12:00', '13:00'];
  minDate: String;

  constructor(private fb: FormBuilder) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.registroCitaForm = this.fb.group({
      doctor: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      detalles: ['', Validators.required]
    });
  }

  dateValidator(control:any): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      return { 'invalidDate': true };
    }
    return null;

  }

  onSubmit(): void {
    if (this.registroCitaForm.valid) {
      console.log('Formulario válido', this.registroCitaForm.value);
      // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    } else {
      console.log('Formulario inválido');
    }
  }
}