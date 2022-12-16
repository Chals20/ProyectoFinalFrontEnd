import { Component,OnInit } from '@angular/core';
import { Dish } from '../models/Dish';
import { Pedido } from '../models/Pedido';
import { CarritoserviceService } from '../service/carritoservice.service';
import { LocalStorageService } from '../service/local-storage.service';
import { TicketserviceService } from '../service/ticketservice.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  constructor(private carritoService: CarritoserviceService,private ticketService: TicketserviceService,
              private localStorage: LocalStorageService){}
  jsonCarrito: Dish[] = [];
  total: number = 0;
 
  clientId: number = 0;

    //service transfer data from card inside carrito
  ngOnInit():void {
      this.carritoService.disparadorCarrito.subscribe(data => {
        if(!this.isExists(data.data.id)){
          this.jsonCarrito.push(data.data);
          this.total += (data.data.amount * data.data.price); 
        }
      });
       this.updateCarrito();
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
    this.updateCarrito();
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
    this.updateCarrito();
  }

  //load transfer that as in carrito
  makeTransfer():void{
    this.updateCarrito();

  }

  updateCarrito():void{
    this.localStorage.setItem("carrito",this.jsonCarrito);
  }
}

/**
 
ngOnInit():void {
    this.carritoService.disparadorCarrito.subscribe(data => {
      if(!this.isExists(data.data.id)){
        this.jsonCarrito.push(data.data);
        this.total += (data.data.amount * data.data.price); 
      }
      this.updateCarrito();
    });
  }
 */