import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NabvarComponent } from './nabvar/nabvar.component';
import { IntroIndexComponent } from './intro-index/intro-index.component';
import { FootbarComponent } from './footbar/footbar.component';
import { CardComponent } from './card/card.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { GraficasComponent } from './graficas/graficas.component';
import { HomeComponent } from './home/home.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NabvarComponent,
    IntroIndexComponent,
    FootbarComponent,
    CardComponent,
    BuscadorComponent,
    GraficasComponent,
    HomeComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
