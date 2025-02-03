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

export class CitaDetalles {
  constructor(
    public _id: string,
    public fechaCita: Date,
    public hora: string,
    public detalles: string,
    public paciente: {
      nombre: string;
      cedula: string;
      telefono: string;
      email: string;
    },
    public doctor: {
      nombre: string;
      especialidad: string;
    }
  ) {}
}
