import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TicketComponent } from './ticket/ticket.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'ticket',component: TicketComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'**',component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
