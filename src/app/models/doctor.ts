export class Doctor {
    constructor(
      public _id: string,
      public nombre: string,
      public especialidad: string,
      public horarioDisponibilidad: Array<{ dia: string, hora: string }>
    ) {}
  }