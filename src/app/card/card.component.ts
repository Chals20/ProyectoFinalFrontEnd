import { Component, Input } from '@angular/core';
import { CarritoserviceService } from '../service/carritoservice.service';
import { Producto } from 'src/app/models/Producto';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  
@Input() dish : any;

constructor(private carritoService: CarritoserviceService) {}
    addCarrito(id:number,name:string,price:number):void{
        const producto: Producto = {
          id : id,
          name : name,
          amount : 1,
          price : price
        }
        this.carritoService.disparadorCarrito.emit({
          data:producto
        });
    }

  
}
