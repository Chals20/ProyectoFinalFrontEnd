import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { User } from '../models/User';
import { ConnectionService } from '../service/api/connection.service';
import { LocalStorageService } from '../service/local-storage.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: String = '';
  pass: String = '';

  url = 'http://proyectofinalbackend-production.up.railway.app/users';

  url2 = 'https://httpbin.org/post';

  respuestaSearch: any;
  respuestaSearchUser: any;
  respuestaSearchEmail: any;
  respuestaLoginUser: any;

  json: any;

  //jsonCarrito;

  //constructor(private loginService: LoginService) {}
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private connection: ConnectionService,
    public router: Router
  ) {}

  async login(form: any) {
    const Swal = require('sweetalert2');
    Swal.fire({
      title: 'Comprobando datos...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      background: '#19191a',
      showConfirmButton: false,
      timer: 3500,
    });
    this.connection
      .getUsernameLogin(form.email, form.pass)
      .subscribe((res: any) => {
        this.respuestaLoginUser = res;
        setTimeout(() => {
          if (this.respuestaLoginUser == null) {
            Swal.fire({
              title: 'Credenciales erroneas',
              icon: 'error',
              confirmButtonColor: '#FEBA0B',
              confirmButtonText: 'Aceptar',
            });
          } else {
            this.crearUserLocal();
          }
        }, 3000);
      });
  }

  //Usando respuestaLoginUser que previamente ha guardado el usuario creamos un User.
  async crearUserLocal() {
    const Swal = require('sweetalert2');
    const user: User = new User(
      this.respuestaLoginUser.id,
      this.respuestaLoginUser.username,
      this.respuestaLoginUser.email,
      this.respuestaLoginUser.password,
      this.respuestaLoginUser.rol.name
    );
    this.localStorage.setItem('user', user);
    //Mostramos el SWAL con el check
    Swal.fire({
      title: 'success',
      text: 'Session iniciada correctamente',
      icon: 'success',
      confirmButtonColor: "#FEBA0B",
      confirmButtonText: 'Aceptar',
    });
    this.router.navigate(['/home']);
  }

  //Comprueba tanto si el email como el username estan cogidos
  async comprobacion(form: any) {
    //Primero comprobamos si el email o el username estan cogidos:
    //Esta email?
    this.connection.getIfExistsByEmail(form.email).subscribe((res: any) => {
      this.respuestaSearchEmail = res;
    });

    //Damos la opcion al usuario de usar tambien el Username
    this.connection.getIfExistsByUsername(form.email).subscribe((res: any) => {
      this.respuestaSearchUser = res;
    });

    setTimeout(() => {
      if (this.respuestaSearchEmail || this.respuestaSearchUser) {
        this.login(form);
      } else {
        const Swal = require('sweetalert2');
        Swal.fire({
          title: 'Credenciales erroneas',
          icon: 'error',
          confirmButtonColor: '#FEBA0B',
          confirmButtonText: 'Aceptar',
        });
      }
    }, 3500);
  }

  async handleSubmit() {
    const form = {
      email: this.email,
      pass: this.pass,
    };
    const Swal = require('sweetalert2');
    if (!this.email.includes('@')) {
      const Swal = require('sweetalert2');
      Swal.fire({
        title: 'Correo electronico incorrecto',
        icon: 'error',
        confirmButtonColor: '#FEBA0B',
        confirmButtonText: 'Aceptar',
      });
    } else {
      Swal.fire({
        title: 'Cargando Datos...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        background: '#19191a',
        showConfirmButton: false,
        timer: 3000,
      });

      await this.comprobacion(form);
    }
  }
}
