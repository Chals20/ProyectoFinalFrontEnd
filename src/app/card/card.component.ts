import { Component, Input, OnInit } from '@angular/core';
import { CarritoserviceService } from '../service/carritoservice.service';
import { Dish } from '../models/Dish';
import { LocalStorageService } from '../service/local-storage.service';
import Swal  from 'sweetalert2';
import { EditDishService } from '../service/edit-dish.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit{

@Input() dish : any;

constructor(private carritoService: CarritoserviceService,private router:Router ,private localstorage: LocalStorageService, public dishService: EditDishService) {}
flagUser:boolean = false;
flagType:boolean = false;

ngOnInit(): void {
  const aux = JSON.parse(this.localstorage.getItem("user"));
  this.flagUser = (aux.id == 0)?false:true;
  this.flagType = (aux.rol == "USER")?false:true;
}

    addCarrito(dish:any):void{
      if(this.flagUser){
        const alergenos = [dish.alergeno.lacteos,dish.alergeno.gluten,dish.alergeno.vegan];
        const data = new Dish(dish.id,dish.name,dish.img,dish.price,dish.category.name,alergenos,1);
          this.carritoService.disparadorCarrito.emit({
            data:data
          });
      }else{
        const Swal = require('sweetalert2');
        Swal.fire({
          title: 'Error!',
          text: 'Inicie Sesión para Agregar ítems al Carro',
          icon: 'question',
          confirmButtonColor: "#FEBA0B",
          confirmButtonText: 'Aceptar'
        })
      }
    }

    edit(){
      this.dishService.setDish(this.dish)
      this.router.navigate(["editor"])

    }
}
