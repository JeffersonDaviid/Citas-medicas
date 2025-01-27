export class HorarioDisponibilidad {
    constructor(
      public _id: string,
      public doctor: string,
      public dia: string,
      public horas: [string]
    ) {}
  }