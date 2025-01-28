export class HorarioDisponibilidad {
  constructor(
    public _id: string,
    public doctor: string,
    public fecha: string,
    public hora: string,
    public estado: string
  ) {}
}