import { Component,OnInit } from '@angular/core';
import { Pedido } from '../models/Pedido';
import { LocalStorageService } from '../service/local-storage.service';
import Swal  from 'sweetalert2';
import { ConnectionService } from '../service/api/connection.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{
  times = ["12.00","12.15","12.30","12.45","13.00","13.15",
  "13.30","13.45","14.00","14.15","14.30","14.45","15.00","15.15","15.30","15.45","16.00"];
  total:number = 0;
  time: number = 0;
  fecha:string = "";
  id:number = 0;
  flagUser: boolean = false;
  jsonCarrito:any = [];

  constructor(private localStorage: LocalStorageService,
    private connection: ConnectionService){}
  
  ngOnInit():void {
    const user = JSON.parse(this.localStorage.getItem("user"));
    this.id = user.id;
    this.jsonCarrito = JSON.parse(this.localStorage.getItem("carrito"));
    this.jsonCarrito.forEach((element:any) => { this.total += (element.price* element.amount);});
    const aux = JSON.parse(this.localStorage.getItem("user"));
    this.flagUser = (aux.id == 0)?false:true;
  }

  sum(id:number){
    this.jsonCarrito.forEach((e:any) => {
      if(e.id == id){
        e.amount++; 
        const n: number = this.total + e.price; 
        this.total = parseFloat(n.toFixed(2));
      }
    });
  }

  //decrement in 1 the amout of carrito;
  rest(id:number){
    this.jsonCarrito.forEach((e:any) => {
      if(e.id == id){
        if(e.amount != 0){
          e.amount--;
          const n: number = this.total - e.price; 
          this.total = parseFloat(n.toFixed(2));
      }
    }
        });
  }

  cancel():void{
    this.localStorage.setItem("carrito","");
    this.jsonCarrito = [];
    this.total = 0;
  }

  SendDataonChange(event: any) {
    this.fecha = event.target.value;
    if(!this.fechaControl(new Date(event.target.value))){
      const Swal = require('sweetalert2');
      Swal.fire({
        title: 'Ingrese una Fecha Posterior al Día de Hoy',
        icon: 'error',
        confirmButtonColor: "#FEBA0B",
        confirmButtonText: 'Aceptar'
      })
    } 
    }

    makeOrder():void{
      const Swal = require('sweetalert2');
      if(this.fechaControl(new Date(this.fecha)) && this.time != 0 && this.total != 0){
        this.sendOrder();
        Swal.fire({
          title: 'Pedido Realizado Con Exito',
          icon: 'success',
          confirmButtonColor: "#FEBA0B",
          confirmButtonText: 'Aceptar'
        });
      }else if(this.total == 0){
        Swal.fire({
          title: 'Error!',
          text: 'No se puede realizar la compra si el carrito esta vacío',
          icon: 'error',
          confirmButtonColor: "#FEBA0B",
          confirmButtonText: 'Aceptar'
        })
      }else {
        Swal.fire({
          title: 'Error!',
          text: 'Corrobore los Datos',
          icon: 'error',
          confirmButtonColor: "#FEBA0B",
          confirmButtonText: 'Aceptar'
        })
      }

    }

    fechaControl(fecha:Date):boolean{
       return (new Date() < fecha);
    }

    sendOrder():void{
      const body ={
        date: new Date(this.fecha),
        user: {
            id: this.id
        },
        hora: this.time,
        total: this.total
    }
    this.connection.postNewOrder(body).subscribe((res:any) =>{
      const body:any[]=[];
      this.jsonCarrito.forEach((element:any) => {
        const object ={"order": {"id": res.id },"dish": {"id": element.id},"amount": element.amount}
        body.push(object);
      });
     this.connection.postNewListDishOrder(body).subscribe((res:any) =>{});
    });
    }
    
}


