import { Component,OnInit } from '@angular/core';
import { Router } from 'express';
import { Search } from '../models/Search';
import { CarritoserviceService } from '../service/carritoservice.service';
import { LocalStorageService } from '../service/local-storage.service';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css'],
})


export class NabvarComponent implements OnInit{
constructor( private localstorage: LocalStorageService,
            private search: SearchService){}
flagMenu: boolean = false;
flagUser: boolean = false;
flagBuscar: boolean = false;
flagCarrito: boolean = false;
flagTypeUser:boolean = false;
flagPerfil:boolean=false;
ngOnInit(): void {
  const aux = JSON.parse(this.localstorage.getItem("user"));

  this.flagUser = (aux.id == 0)?false:true;

  this.flagTypeUser = (aux.rol == "ADMIN")?true:false;

  this.flagPerfil = (aux.id != 0 && aux.rol == "USER")?true:false;
  }


  // Variables selector
  nombrePlato: string= "";
  tipoPlato: number = 0;
  pMin: number = 0;
  pMax: number = 0;
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


  filtrarPlatos(): void {
    
    const Swal = require('sweetalert2');
    Swal.fire({
      title: 'Cargando Datos...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      background: '#19191a',
      showConfirmButton: false,
      timer: 1000,
  }); 
    const PMAX = (this.pMax == 0)?100:this.pMax;
    const busqueda: Search = new Search(this.tipoPlato,this.nombrePlato,this.pMin,PMAX,
    this.celiaco,this.lactosa,this.vegano);
      this.search.disparador.emit({data:busqueda});
  }
}
