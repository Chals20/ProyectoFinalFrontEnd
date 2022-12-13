import { Component,OnInit } from '@angular/core';
import { CarritoserviceService } from '../service/carritoservice.service';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css'],
})

export class NabvarComponent {
  flagMenu: boolean = false;
  flagUser: boolean = true;
  flagBuscar: boolean = false;
  flagCarrito: boolean = false;

  // Variables selector
  nombrePlato: string= "";
  tipoPlato: string = '';
  pMin: string = '';
  pMax: string = '';
  //booleanos selector
  celiaco: boolean = false;
  lactosa: boolean = false;
  vegano: boolean = false;


  mostrarMenu(): void {
    if (!this.flagMenu) this.flagMenu = true;
    else this.flagMenu = false;
  }

  userInside(): void {
    this.flagUser = true;
  }

  buscar(): void {
    if (!this.flagBuscar) {
      this.flagCarrito = false;
      this.flagBuscar = true;
    } else this.flagBuscar = false;
  }

  carrito(): void {
    if (!this.flagCarrito) {
      this.flagCarrito = true;
      this.flagBuscar = false;
    } else this.flagCarrito = false;
  }

  json: any;

  filtrarPlatos(): void {
    console.log('Tipo de plato: ' + this.tipoPlato);
    console.log("Nombre del plato: " + this.nombrePlato);
    console.log('Precio minimo: ' + this.pMin);
    console.log('Precio maximo: ' + this.pMax);
    console.log('Check celiaco: ' + this.celiaco);
    console.log('Check lactosa: ' + this.lactosa);
    console.log('Check vegano: ' + this.vegano);

    this.json = [
      {
        tipoPlato: this.tipoPlato,
        nombrePlato: this.nombrePlato,
        pMin: this.pMin,
        pMax: this.pMax,
        celiaco: this.celiaco,
        lactosa: this.lactosa,
        vegano: this.vegano
      },
    ];
    console.log('JSON ' + this.json);

  }
}
