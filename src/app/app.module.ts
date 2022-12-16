import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NabvarComponent } from './nabvar/nabvar.component';
import { IntroIndexComponent } from './intro-index/intro-index.component';
import { FootbarComponent } from './footbar/footbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CardComponent } from './card/card.component';
import { BuscadorComponent } from './buscador/buscador.component';

import { GraficasComponent } from './graficas/graficas.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { TicketComponent } from './ticket/ticket.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NabvarComponent,
    IntroIndexComponent,
    FootbarComponent,
    LoginComponent,
    RegisterComponent,
    CardComponent,
    BuscadorComponent,
    GraficasComponent,
    HomeComponent,
    CarritoComponent,
    TicketComponent,
    AboutComponent,
    PerfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
