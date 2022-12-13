import { Component,OnInit } from '@angular/core';
import { Dish } from '../models/Dish';
import { LocalStorageService } from '../service/local-storage.service';
import { TicketserviceService } from '../service/ticketservice.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{

  total:number = 0;

  constructor(private localStorage: LocalStorageService){}
  jsonCarrito:any = [];

  ngOnInit():void {
   this.jsonCarrito = JSON.parse(this.localStorage.getItem("carrito"));
    this.jsonCarrito.forEach((element:any) => { this.total += (element.price* element.amount);});
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
  }


}


