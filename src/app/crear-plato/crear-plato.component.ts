import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/api/connection.service';
import { EditDishService } from '../service/edit-dish.service';

@Component({
  selector: 'app-crear-plato',
  templateUrl: './crear-plato.component.html',
  styleUrls: ['./crear-plato.component.css'],
})
export class CrearPlatoComponent implements OnInit {
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

  async create(form: any) {
    const Swal = require('sweetalert2');
    this.connection.postNewDish(form).subscribe(
      (res: any) => {
        console.log('Esto es respuesta de postNewDish ' + res);
        Swal.fire({
          title: 'success',
          text: 'Plato creado correctamente',
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
          confirmButtonColor: "#FEBA0B",
          confirmButtonText: 'Aceptar',
        });
      }
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
      await this.create(form);
    }
    else {
      Swal.fire({
        text: 'Relle la categoria del plato correctamente.',
        icon: 'error',
        confirmButtonColor: "#FEBA0B",
        confirmButtonText: 'Aceptar',
      });
    }

  }

  ngOnInit(): void {
    this.veg = 0;
    this.lac = 0;
    this.cel = 0;
  }
}
