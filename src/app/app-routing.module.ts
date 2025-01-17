import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { DashboardPerfilComponent } from './components/dashboard-perfil/dashboard-perfil.component';
import { RegistroCitaComponent } from './components/registro-cita/registro-cita.component';
import { HorarioDisponibleComponent } from './components/horario-disponible/horario-disponible.component';

const routes: Routes = [
  { path: 'inicio', component: HomeComponent },
  { path: 'login', component: InicioSesionComponent },
  { path: 'register', component: RegistroUsuarioComponent },
  { path: 'dashboard', component: DashboardPerfilComponent },
  { path: 'register-medical-appointment', component: RegistroCitaComponent },
  { path: 'available-dates', component: HorarioDisponibleComponent },
  { path: '**', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
