import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { DashboardPerfilComponent } from './components/dashboard-perfil/dashboard-perfil.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistroCitaComponent } from './components/registro-cita/registro-cita.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HorarioDisponibleComponent } from './components/horario-disponible/horario-disponible.component';
import { CitasProgramadasComponent } from './components/citas-programadas/citas-programadas.component';
import { HttpClientModule } from '@angular/common/http';
import { CitaDetalleComponent } from './components/cita-detalle/cita-detalle.component';
import { DoctorService } from './services/doctor.service';
import { HorarioDisponibilidadService } from './services/horario-disponibilidad.service';

import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    HomeComponent,
    RegistroUsuarioComponent,
    DashboardPerfilComponent,
    NavbarComponent,
    RegistroCitaComponent,
    FooterComponent,
    HorarioDisponibleComponent,
    CitasProgramadasComponent,
    CitaDetalleComponent,
    RecuperarContrasenaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DoctorService, HorarioDisponibilidadService],
  bootstrap: [AppComponent],
})
export class AppModule {}