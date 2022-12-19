import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { ConnectionService } from '../service/api/connection.service';
import { EditDishService } from '../service/edit-dish.service';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {

  json: any = [];


  id: String = '';
  img: String = '';
  name: String = '';
  price: string = '';
  category: String = '';
  alergeno: String = '';

  vegano: boolean = false;
  lacteo: boolean = false;
  celiaco: boolean = false;

  veg: any;
  lac: any;
  cel: any;

  constructor(
    private connection: ConnectionService,
    public router: Router,
    public dishService: EditDishService
  ) {}

  cambioVariable(condicion:boolean): String{
    return condicion ? '1' : '0'
  }

  cambioVegano(){
    this.vegano = !this.vegano;
    this.veg = this.cambioVariable(this.vegano);
  }

  cambioCeliaco(){
    this.celiaco = !this.celiaco;
    this.cel = this.cambioVariable(this.celiaco);
  }

  cambioLacteo(){
    this.lacteo = !this.lacteo;
    this.lac = this.cambioVariable(this.lacteo);
  }

  alergenos(){
    //alergenos(id,lacteos,gluten,vegan) values(1,1,1,1),(2,0,0,0),(3,0,1,0),(4,0,1,1),(5,0,0,1),(6,1,0,1);
    if (this.lacteo && this.celiaco && this.vegano){
      this.alergeno = "1";
    }
    else if (!this.lacteo && !this.celiaco && !this.vegano){
      this.alergeno = "2";
    }
    else if (!this.lacteo && this.celiaco && !this.vegano){
      this.alergeno = "3";
    }
    else if (!this.lacteo && this.celiaco && this.vegano){
      this.alergeno = "4";
    }
    else if (!this.lacteo && !this.celiaco && this.vegano){
      this.alergeno = "5";
    }
    else if (this.lacteo && !this.celiaco && this.vegano){
      this.alergeno = "6";
    }

    console.log("vegano " + this.vegano)
    console.log("celiaco " + this.celiaco)
    console.log("lacteo " + this.lacteo)
    console.log("alergeno " + this.alergeno)
  }




  async create(form: any) {
    const Swal = require('sweetalert2');
    //Cambiar servicio
    this.connection.postNewDish(form).subscribe(
      (res: any) => {
        console.log('Esto es respuesta de postNewDish ' + res);
        Swal.fire({
          title: 'success',
          text: 'Plato actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      },
      (error: any) => {
        console.log(error);
        Swal.fire({
          text: 'Fallo al conectar a la base de datos',
          icon: 'error',
        });
      }
    );
  }

  async update(form: any) {
    const Swal = require('sweetalert2');
    //Cambiar servicio (Introducir id de forma dinamica)
    this.connection.updateDishFromId(16,form).subscribe(
      (res: any) => {
        console.log('Esto es respuesta de updateDishFromId ' + res);
        Swal.fire({
          title: 'success',
          text: 'Plato actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      },
    );
  }


  async eliminar() {
    const Swal = require('sweetalert2');
    //Cambiar servicio (Introducir id de forma dinamica)
    this.connection.deleteDishFromId(24).subscribe(
      (res: any) => {
        console.log('Esto es respuesta de deleteDishFromId ' + res);
        Swal.fire({
          title: 'success',
          text: 'Plato eliminado correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        setTimeout (() => {
          this.router.navigate(['/home']);
          window.location.reload();
        }, 1100);
      },
    );

  }



  async handleSubmit() {
    this.alergenos();
    const form = {
      name: this.name,
      img: this.img,
      price: this.price,
      category: {
        id: this.category,
      },
      alergeno: {
        id: this.alergeno,
      },
    };

    console.log(form);

    await this.update(form);


    //await this.create(form); //Funciona
  }

  ngOnInit(): void {
    this.id = this.dishService.dish.id;
    this.img = this.dishService.dish.img;
    this.name = this.dishService.dish.name;
    this.price = this.dishService.dish.price;
    this.category = this.dishService.dish.category;
    this.veg = this.dishService.dish.alergeno.vegan;
    this.lac = this.dishService.dish.alergeno.lacteos;
    this.cel = this.dishService.dish.alergeno.gluten;



  }
}
