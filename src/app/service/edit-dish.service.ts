import { EventEmitter, Injectable, Output } from '@angular/core';
import { Dish } from '../models/Dish';

@Injectable({
  providedIn: 'root'
})
export class EditDishService {
  @Output() disparador: EventEmitter<any> = new EventEmitter();
  constructor() { }

  dish:any;

  setDish(dish:Dish):void{
    this.dish = dish;
  }

  getDish():Dish{
    return this.dish;
  }
}
