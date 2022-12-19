import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { HomeComponent } from './home/home.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TicketComponent } from './ticket/ticket.component';
import { GraficasComponent } from './graficas/graficas.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'ticket',component: TicketComponent},
  {path: 'profile',component: PerfilComponent},
  {path: 'showOrders',component: ShowOrdersComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'editor', component: EditorComponent},
  {path: 'graficas',component: GraficasComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'**',component: HomeComponent} //Este siempre al final de todo




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
