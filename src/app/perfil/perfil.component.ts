import { Component, OnInit } from '@angular/core';
import { Dish } from '../models/Dish';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { ConnectionService } from '../service/api/connection.service';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  constructor(private connection: ConnectionService, private localStorage: LocalStorageService){}
  user:User = new User(0,"","","","USER");
  response:any;
  json:Order[] = [];

  ngOnInit(): void {
    const aux = JSON.parse(this.localStorage.getItem("user"));
    this.user = aux;
    const date = new Date();
    const sendDate = ""+ date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDay()+7);
    console.log(date + "-" + sendDate + "-" +aux.id + " " + date.getDay());

  }

  loadPedidos():void{
    const Swal = require('sweetalert2');
    Swal.fire({
      title: 'Cargando Datos...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      background: '#19191a',
      showConfirmButton: false,
      timer: 1000,
  }); 
    this.connection.getOrderByUser(this.user.id,"2022-12-18").subscribe((res:any)  =>{
      this.loadJson(res);
  });
  }

  loadJson(res:any):void{
    if(res.length != 0){
      res.forEach((e:any) => {
        this.json.push(new Order(e.id,this.chanceDate(e.date),e.hora,this.getDish(e.id),e.total));
        });
    }else{
      const Swal = require('sweetalert2');
      Swal.fire({
        title: "No hay pedidos",
        icon: "error",
        confirmButtonColor: "#FEBA0B",
        confirmButtonText: 'Aceptar'
    });
    }}

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
    let show = "";
    order.listDish.forEach((e:Dish) => {
      const string = `${e.name}: ${e.price}€ x ${e.amount} = ${(e.price * e.amount)} </br> `; 
      show +=string +"\n";
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
