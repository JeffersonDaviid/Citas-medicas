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
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
