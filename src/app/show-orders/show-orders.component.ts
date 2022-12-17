import { Component } from '@angular/core';
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
  response:any;

  SendDataonChange(event: any) {
    this.fecha=event.target.value;
    }

  search():void{
    if(this.fecha == null){
      const Swal = require('sweetalert2');
      Swal.fire({
        title: 'Ingrese una Fecha para Realizar la Busqueda',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }else{
      this.loadOrders();
      this.loadPedidos();
    }
  }

 loadOrders():void {
  let aux : any;
   this.connection.getOrderByDate(this.fecha).subscribe((res:any)  => {
    this.response = res;
   });
    return aux;
  }

  loadPedidos = async() => {
      this.response.forEach((e:any) => {
        const order = new Order(e.id,this.chanceDate(e.date),e.hora,this.getDish(e.id),e.total);
        order.setUser(e.user.id,e.user.username,e.user.email);
       this.json.push(order);
       });

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
}
