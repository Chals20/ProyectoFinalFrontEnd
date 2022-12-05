import { Component } from '@angular/core';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})

export class NabvarComponent {

flagMenu: boolean = false;
flagUser: boolean = true;
flagBuscar: boolean = false;
flagCarrito: boolean = false;
mostrarMenu():void {
    if(!this.flagMenu) this.flagMenu = true;
    else this.flagMenu =  false;
}

userInside(): void{
this.flagUser = true;
}

buscar():void{
  if(!this.flagBuscar){
    this.flagCarrito =  false;
    this.flagBuscar = true;
  } 
  else this.flagBuscar =  false;
}

carrito():void{
  if(!this.flagCarrito){
    this.flagCarrito = true; 
    this.flagBuscar =  false;
  } 
  else this.flagCarrito =  false;
}

}
