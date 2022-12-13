import { Component,OnInit } from '@angular/core';
import { Dish } from '../models/Dish';
import { Pedido } from '../models/Pedido';
import { CarritoserviceService } from '../service/carritoservice.service';
import { TicketserviceService } from '../service/ticketservice.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  constructor(private carritoService: CarritoserviceService,private ticketService: TicketserviceService){}
  jsonCarrito: Dish[] = [];
  total: number = 0;
  time: number = 12.00;
  clientId: number = 0;
  times = ["12.00","12.15","12.30","12.45","13.00","13.15",
  "13.30","13.45","14.00","14.15","14.30","14.45","15.00","15.15","15.30","15.45","16.00"];
    //service transfer data from card inside carrito
  ngOnInit():void {
    this.carritoService.disparadorCarrito.subscribe(data => {
      if(!this.isExists(data.data.id)){
        this.jsonCarrito.push(data.data);
        this.total += (data.data.amount * data.data.price); 
      }

    });
  }
  //control of exist a element inside carrito
  isExists(id:number){
    for (let index = 0; index < this.jsonCarrito.length; index++) {
      if(this.jsonCarrito[index].id == id){
        this.jsonCarrito[index].amount +=1;
        this.total += this.jsonCarrito[index].price;
        return true;
      }
      }
    return false;
  }

  //increment in 1 the amout of carrito;
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
          e.amount--;
          const n: number = this.total - e.price; 
          this.total = parseFloat(n.toFixed(2));
}
 // if(e.amout == 0) hay que utilizar el filter para que cuando llegue a 0 se elimine;
   this.jsonCarrito = this.jsonCarrito.filter((item:any) => item.amount !== 0);
    });
  }

  //load transfer that as in carrito
  makeTransfer():void{
    console.log(this.jsonCarrito);
    this.ticketService.disparadorTicket.emit({
      data:this.jsonCarrito});
    //this.jsonCarrito = [];
  }

}
