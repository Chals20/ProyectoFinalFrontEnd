import { Component } from '@angular/core';

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
  //platoSel:  any;
  platoSel: string[] = ['Apple', 'Orange', 'Banana'];

  // Variables selector
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
    this.tipoPlato += '';
    console.log('Tipo de plato ' + this.tipoPlato);
    console.log('Precio minimo ' + this.pMin);
    console.log('Precio maximo ' + this.pMax);
    console.log('Check celiaco ' + this.celiaco);
    console.log('Check lactosa ' + this.lactosa);
    console.log('Check vegano ' + this.vegano);

    this.json = [
      {
        tipoPlato: this.tipoPlato,
        pMin: this.pMin,
        pMax: this.pMax,
        celiaco: this.celiaco,
        lactosa: this.lactosa,
        vegano: this.vegano
      },
    ];
  }
}
