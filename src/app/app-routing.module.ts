import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { DashboardPerfilComponent } from './components/dashboard-perfil/dashboard-perfil.component';
import { RegistroCitaComponent } from './components/registro-cita/registro-cita.component';
import { HorarioDisponibleComponent } from './components/horario-disponible/horario-disponible.component';
import { CitasProgramadasComponent } from './components/citas-programadas/citas-programadas.component';
import { CitaDetalleComponent } from './components/cita-detalle/cita-detalle.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: InicioSesionComponent },
  { path: 'registro', component: RegistroUsuarioComponent },
  { path: 'perfil', component: DashboardPerfilComponent },
  { path: 'registro-cita', component: RegistroCitaComponent },
  { path: 'horario-disponible', component: HorarioDisponibleComponent },
  { path: 'horario-general', component: CitasProgramadasComponent },
  { path: 'cita/:id', component: CitaDetalleComponent },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
