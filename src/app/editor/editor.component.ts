import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/api/connection.service';
import { EditDishService } from '../service/edit-dish.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  id: String = '';
  img: String = '';
  name: String = '';
  price: string = '';
  category: String = '';
  alergeno: String = '';

  vegano: boolean = true;
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

  cambioVariable(condicion: boolean): String {
    return condicion ? '1' : '0';
  }

  cambioVariableVeg(condicion: boolean): String {
    return condicion ? '0' : '1';
  }
  cambioVegano() {
    this.vegano = !this.vegano;
    this.veg = this.cambioVariableVeg(this.vegano);
    console.log(this.vegano, ' bool vegano');
    console.log(this.veg, 'veg');
  }

  cambioCeliaco() {
    this.celiaco = !this.celiaco;
    this.cel = this.cambioVariable(this.celiaco);
  }

  cambioLacteo() {
    this.lacteo = !this.lacteo;
    this.lac = this.cambioVariable(this.lacteo);
  }

  alergenos() {
    //alergenos(id,lacteos,gluten,vegan) values(1,1,1,1),(2,0,0,0),(3,0,1,0),(4,0,1,1),(5,0,0,1),(6,1,0,1);
    if (this.lacteo && this.celiaco && this.vegano) {
      this.alergeno = '1';
    } else if (!this.lacteo && !this.celiaco && !this.vegano) {
      this.alergeno = '2';
    } else if (!this.lacteo && this.celiaco && !this.vegano) {
      this.alergeno = '3';
    } else if (!this.lacteo && this.celiaco && this.vegano) {
      this.alergeno = '4';
    } else if (!this.lacteo && !this.celiaco && this.vegano) {
      this.alergeno = '5';
    } else if (this.lacteo && !this.celiaco && this.vegano) {
      this.alergeno = '6';
    } else {
      this.alergeno = 'error';
    }

    console.log('vegano ' + this.vegano);
    console.log('celiaco ' + this.celiaco);
    console.log('lacteo ' + this.lacteo);
    console.log('alergeno ' + this.alergeno);
  }

  async update(form: any) {
    const Swal = require('sweetalert2');
    //Cambiar servicio (Introducir id de forma dinamica)
    console.log(form);
    this.connection.updateDishFromId(this.id, form).subscribe(
      (res: any) => {
        console.log('Esto es respuesta de updateDishFromId ' + res);
        Swal.fire({
          title: 'success',
          text: 'Plato actualizado correctamente',
          icon: 'success',
          confirmButtonColor: "#FEBA0B",
          confirmButtonText: 'Aceptar',
        });
        this.router.navigate(['/home']);
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

  async eliminar() {
    const Swal = require('sweetalert2');
    //Cambiar servicio (Introducir id de forma dinamica)
    this.connection.deleteDishFromId(this.id).subscribe(
      (res: any) => {
        console.log('Esto es respuesta de deleteDishFromId ' + res);
        Swal.fire({
          title: 'success',
          text: 'Plato eliminado correctamente',
          icon: 'success',
          confirmButtonColor: "#FEBA0B",
          confirmButtonText: 'Aceptar',
        });
        this.router.navigate(['/home']);
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


  handleSubmit2(){
    console.log("Esta es la categoria:" + this.category);
    console.log(this.category);
    console.log("//////////////////////////")
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
    console.log("Esta es la categoria: nextline" + this.category);
    console.log(this.category);
    const Swal = require('sweetalert2');
    if (this.alergeno == 'error') {
      Swal.fire({
        text: 'La combinación de alergenos seleccionada no está contemplada.',
        icon: 'error',
        confirmButtonColor: "#FEBA0B",
        confirmButtonText: 'Aceptar',
      });
    }
    else if(this.category == "1" || this.category == "2" || this.category == "3"){
      await this.update(form);
    }

    else {
      Swal.fire({
        text: 'Rellene la categoria del plato correctamente.',
        icon: 'error',
        confirmButtonColor: "#FEBA0B",
        confirmButtonText: 'Aceptar',
      });
    }

    //await this.create(form); //Funciona
  }

  ngOnInit(): void {
    this.id = this.dishService.dish.id;
    this.img = this.dishService.dish.img;
    this.name = this.dishService.dish.name;
    this.price = this.dishService.dish.price;
    this.category = this.dishService.dish.category;
    this.veg = 0;
    this.lac = 0;
    this.cel = 0;
  }
}
