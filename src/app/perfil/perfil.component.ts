import { Component, OnInit } from '@angular/core';
import { Dish } from '../models/Dish';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { ConnectionService } from '../service/api/connection.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  constructor(private connection: ConnectionService){}
  user:User = {
    id : 2,
    userName : "Chals",
    email : "chals@gmail.com",
    password : "1234",
    rol : "USER"
  }
  response:any;
  json:Order[] = [];

  ngOnInit(): void {
    this.connection.getOrderByUser(2,"2020-03-03").subscribe((res:any)  =>{
        this.response = res;
    });
  }

  loadPedidos():void{
    this.response.forEach((e:any) => {
    this.json.push(new Order(e.id,this.chanceDate(e.date),e.hora,this.getDish(e.id),e.total));
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
