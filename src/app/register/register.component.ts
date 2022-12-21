import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { User } from '../models/User';
import { ConnectionService } from '../service/api/connection.service';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: String = '';
  pass1: String = '';
  pass2: String = '';
  phone: String = '';
  email1: String = '';
  email2: String = '';
  btnDeshabilitado: boolean = false;

  //Variable para recoger las respuestas del backend
  respuestaSearchEmail: any;
  respuestaSearchUser: any;
  respuestaPostUser: any;

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService,
    private connection: ConnectionService,
    public router: Router
  ) {}

  register(): void {
    console.log(
      this.username + '\n' + this.email1 + '\n' + this.pass1 + '\n' + this.phone
    );
  }

  async comprobacion(form: any) {
    //Primero comprobamos si el email o el username estan cogidos:
    //Esta email?
    this.connection.getIfExistsByEmail(form.email).subscribe((res: any) => {
      console.log('Esto es respuesta de getIfExistsbyEmail ' + res);
      this.respuestaSearchEmail = res;
    });

    this.connection
      .getIfExistsByUsername(form.username)
      .subscribe((res: any) => {
        console.log('Esto es respuesta de getIfExistsByUsername ' + res);
        this.respuestaSearchUser = res;
      });

    setTimeout(() => {
      if (!this.respuestaSearchUser && !this.respuestaSearchEmail) {
        this.registro(form);
      } else {
        const Swal = require('sweetalert2');
        Swal.fire({
          title: 'Usuario ya existe',
          icon: 'error',
          confirmButtonColor: '#FEBA0B',
          confirmButtonText: 'Aceptar',
        });
      }
    }, 2000);
  }

  async registro(form: any) {
    const Swal = require('sweetalert2');
    this.connection.postUser(form).subscribe((res: any) => {
      console.log('Esto es la respuesta de postUser ' + res);
      this.respuestaPostUser = res;
    });
    Swal.fire({
      title: 'success',
      text: 'Usuario registrado correctamente',
      icon: 'success',
      confirmButtonColor: "#FEBA0B",
      confirmButtonText: 'Aceptar',
    });
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }

  async login(form: any) {
    const Swal = require('sweetalert2');
    this.connection.getIfExistsByUsername(form.username).subscribe(
      (res: any) => {
        console.log('Esto es respuesta de getIfExistsByUsername ' + res);
        this.respuestaSearchUser = res;
        Swal.fire({
          title: 'success',
          text: 'Session iniciada correctamente',
          icon: 'success',
          confirmButtonColor: "#FEBA0B",
          confirmButtonText: 'Aceptar',
        });
      },
      (error: any) => {
        console.log(error);
        Swal.fire({
          text: 'Login incorrecto',
          icon: 'error',
        });
      }
    );

    await this.crearUserLocal();
  }

  async crearUserLocal() {
    console.log('Crear user Local');

    const user: User = new User(
      this.respuestaSearchUser.id,
      this.respuestaSearchUser.username,
      this.respuestaSearchUser.email,
      this.respuestaSearchUser.password,
      this.respuestaSearchUser.rol.id
    );
    console.log('Este es el USER');
    console.log(user);
  }

  async handleSubmit() {
    const form = {
      username: this.username,
      email: this.email1,
      password: this.pass1,
      rol: {
        id: 2,
      },
    };
    const Swal = require('sweetalert2');
    if (!this.email1.includes('@')) {
      const Swal = require('sweetalert2');
      Swal.fire({
        title: 'Correo electronico incorrecto',
        icon: 'error',
        confirmButtonColor: '#FEBA0B',
        confirmButtonText: 'Aceptar',
      });
    } else {
      const Swal = require('sweetalert2');
      Swal.fire({
        title: 'Comprobando datos...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        background: '#19191a',
        showConfirmButton: false,
        timer: 2000,
      });
      await this.comprobacion(form);
    }
    //Si no ha encontrado NINGUNO de ellos significa que podemos crear el usuario nuevo
    // if (!this.respuestaSearchUser && !this.respuestaSearchEmail) {
    //   //Hacemos el post del nuevo usuario.
    //   await this.registro(form);

    //   //Volvemos a buscar el usuario que ahora si que estara en la base de datos para obtener todos los datos
    //   //incluido el ID que depende del backend
    //   await this.login(form);
    // }
  }
}
