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
    private connection: ConnectionService
  ) {}

  async login(form: any) {

    this.connection
      .getUsernameLogin(form.email, form.pass)
      .subscribe((res: any) => {
        console.log('Esto es respuesta de getUsernameLogin(login) ' + res);
        this.respuestaLoginUser = res;
      });

  }

  //Usando respuestaLoginUser que previamente ha guardado el usuario creamos un User.
  async crearUserLocal() {
    const Swal = require('sweetalert2');
    console.log('Crear user Local + datos a continuacion');
    console.log(this.respuestaLoginUser.id);
    console.log(this.respuestaLoginUser.username);
    console.log(this.respuestaLoginUser.email);
    console.log(this.respuestaLoginUser.password);
    console.log(this.respuestaLoginUser.rol.name);

    const user: User = new User(
      this.respuestaLoginUser.id,
      this.respuestaLoginUser.username,
      this.respuestaLoginUser.email,
      this.respuestaLoginUser.password,
      this.respuestaLoginUser.rol.name
    );
    console.log('Este es el USER');
    console.log(user);


    this.localStorage.setItem('user', user);
    //Mostramos el SWAL con el check
    Swal.fire({
      title: 'success',
      text: 'Session iniciada correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
  }

  //Comprueba tanto si el email como el username estan cogidos
  async comprobacion(form: any) {
    //Primero comprobamos si el email o el username estan cogidos:
    //Esta email?
    this.connection.getIfExistsByEmail(form.email).subscribe((res: any) => {
      console.log('Esto es respuesta de getIfExistsbyEmail ' + res);
      this.respuestaSearchEmail = res;
    });

    //Damos la opcion al usuario de usar tambien el Username
    this.connection.getIfExistsByUsername(form.email).subscribe((res: any) => {
      console.log('Esto es respuesta de getIfExistsByUsername ' + res);
      this.respuestaSearchUser = res;
    });
  }

  async handleSubmit() {
    const form = {
      email: this.email,
      pass: this.pass,
    };

    await this.comprobacion(form);

    //Si hay algun fallo con la conexión a la base de datos (SWAL NEGATIVO)
    const Swal = require('sweetalert2');
    if (!this.respuestaSearchEmail && !this.respuestaSearchUser) {
      Swal.fire({
        title: 'Error!',
        text: 'Datos aportados incorrectos.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }

    //Si nos devuelve que es correcto
    //NECESITAMOS ESTAR DE ACUERDO SI INICIAMOS SESION CON EL USERNAME O CON EL CORREO
    else {
      await this.login(form);

      await this.crearUserLocal();
    }

    //Guardar objeto usuario con los datos devueltos por el backend

    // this.connection.postUser(form);
    // this.http.post(this.url2, form).toPromise().then((data:any) => {
    //   console.log(data);
    //   this.json = JSON.stringify(data.json);
    //   console.log(this.json);
    //   this.storage.setItem("username",this.username)
    //   this.storage.setItem("email",this.email)
    //   this.storage.setItem("password",this.pass)
    //   console.log("Salimos de storage")
    // })

    // this.loginService.login(this.form.email, this.form.password).subscribe(
    //   (data: any) => {
    //     //window.location.reload();
    //   },
    //   (error:any) => {
    //     console.log(error);
    //   }
    // );
  }
}
