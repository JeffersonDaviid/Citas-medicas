export class Cita {
  constructor(
    public _id: string,
    public cedulaPaciente: string,
    public doctorId: string,
    public detalles: string,
    public hora: string,
    public fechaRegistro: Date,
    public fechaCita: Date
  ) {}
}
