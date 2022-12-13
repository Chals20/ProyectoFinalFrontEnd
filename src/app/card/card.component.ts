import { Component, Input } from '@angular/core';
import { CarritoserviceService } from '../service/carritoservice.service';
import { Dish } from '../models/Dish';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  
@Input() dish : any;

constructor(private carritoService: CarritoserviceService) {}
    addCarrito(dish:any):void{
      const alergenos = [dish.alergeno.lacteos,dish.alergeno.gluten,dish.alergeno.vegan];
      const data = new Dish(dish.id,dish.name,dish.img,dish.price,dish.category.name,alergenos,1);
        this.carritoService.disparadorCarrito.emit({
          data:data
        });
    }

}
