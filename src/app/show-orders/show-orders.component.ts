import { Component } from '@angular/core';
import { waitForDebugger } from 'inspector';
import { Dish } from '../models/Dish';
import { Order } from '../models/Order';
import { ConnectionService } from '../service/api/connection.service';

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.css']
})
export class ShowOrdersComponent {

  constructor(private connection: ConnectionService){}
  fecha:any|string=null;
  json:Order[]= [];

  SendDataonChange(event: any) {
    this.fecha=event.target.value;
    }

  search():void{
    if(this.fecha == null){
      const Swal = require('sweetalert2');
      Swal.fire({
        title: 'Ingrese una Fecha para Realizar la Busqueda',
        icon: 'error',
        confirmButtonColor: "#FEBA0B",
        confirmButtonText: 'Aceptar'
      })
    }else{
      console.log(this.fecha);
      this.json=[];
      this.loadOrders();
    }
  }


 loadOrders():void{
  const Swal = require('sweetalert2');
  Swal.fire({
    title: 'Cargando Datos...',
    allowEscapeKey: false,
    allowOutsideClick: false,
    background: '#19191a',
    showConfirmButton: false,
    timer: 1000,
}); 
    this.connection.getOrderByDate(this.fecha).subscribe((res:any)  => {
      this.loadPedidos(res);
     });
  }

  loadPedidos(res:any):void{
    if(res.length != 0){
      res.forEach((e:any) => {
        const order = new Order(e.id,this.chanceDate(e.date),e.hora,this.getDish(e.id),e.total);
        order.setUser(e.user.id,e.user.username,e.user.email);
       this.json.push(order);
      });
    }else{
      const Swal = require('sweetalert2');
      Swal.fire({
        title: this.fecha,
        text: "No hay pedidos",
        confirmButtonColor: "#FEBA0B",
        confirmButtonText: 'Aceptar'
    });
    }
      
}
    
  getDish(id:number):Dish[]{
    let listDish: Dish[] = [];
    this.connection.getDishOrder(id).subscribe((res:any) => {
        res.forEach((e:any) => {
            listDish.push(new Dish(e.id,e.name,e.img,e.price,null,null,e.amount));
        });
    });
    return listDish;
  }
      //mod date of back
      chanceDate(date:any):any{
        let fecha: string = new Date(date).toLocaleDateString()
        return fecha;
      }

      showDish(order:Order):void{
        let show :string="";
        order.listDish.forEach((e:Dish) => {
          const string = `${e.name}: ${e.price}€ x ${e.amount} = ${(e.price * e.amount)} </br> `; 
          show+=string;
        });
        const Swal = require('sweetalert2');
        Swal.fire({
          title: 'Pedido',
          html:show,
          confirmButtonColor: "#FEBA0B",
          confirmButtonText: 'Aceptar'
      });
    }
}
