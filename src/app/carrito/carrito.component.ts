import { Component,OnInit } from '@angular/core';
import { Pedido } from '../models/Pedido';
import { CarritoserviceService } from '../service/carritoservice.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  constructor(private carritoService: CarritoserviceService){}
  jsonCarrito: any = [];
  total: number = 0;
  time: number = 13.15;
  clientId: number = 0;
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
        this.total += e.price;}
    });
  }

  //decrement in 1 the amout of carrito;
  rest(id:number){
    this.jsonCarrito.forEach((e:any) => {
      if(e.id == id){
          e.amount--; 
          this.total -= e.price;
}
 // if(e.amout == 0) hay que utilizar el filter para que cuando llegue a 0 se elimine;
   this.jsonCarrito = this.jsonCarrito.filter((item:any) => item.amount !== 0);
    });
  }

  

  makeTransfer():void{
    const pedido = new Pedido(0,this.time,this.total,this.clientId,this.jsonCarrito);
  }

}
