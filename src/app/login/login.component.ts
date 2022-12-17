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

  json: any;

  //jsonCarrito;

  //constructor(private loginService: LoginService) {}
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private connection: ConnectionService
  ) {}

  login(): void {
    console.log(this.email + '\n' + this.pass);
  }

  handleSubmit() {
    const form = {
      email: this.email,
      pass: this.pass,
    };
    console.log('LOGIN');
    //Comprobamos si username existe (da booleano)
    this.connection.getIfExistsByEmail(form.email).subscribe((res: any) => {
      console.log('Esto es respuesta de getUsername1 ' + res);
      this.respuestaSearch = res;
    });

    console.log('Esto es respuestaSearch ' + this.respuestaSearch);
    //Si hay algun fallo con la conexión a la base de datos
    const Swal = require('sweetalert2');
    if (this.respuestaSearch == false) {
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
      this.connection
        .getUsernameLogin(form.email, form.pass)
        .subscribe((res: any) => {
          console.log('Esto es respuesta de getUsername2 ' + res);
          this.respuestaSearch = res;
        });

        //llenamos el objeto usuario
      if (this.respuestaSearch !== null) {
        const user: User = new User(
          this.respuestaSearch.id,
          this.respuestaSearch.username,
          this.respuestaSearch.email,
          this.respuestaSearch.password,
          this.respuestaSearch.rol.id
        );
        console.log('Este es el USER');
        console.log(user);
        this.localStorage.setItem("user2",user);
        //Mostramos el SWAL con el check
        Swal.fire({
          title: 'success',
          text: 'Session iniciada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }
      else{

      }

      //  const pedido: Pedido = new Pedido(1,this.time,this.total,1,this.jsonCarrito);
      //const user: User = new User(this.respuestaSearch.id, this.respuestaSearch.username, this.respuestaSearch.email,this.respuestaSearch.password,this.respuestaSearch.rol.id);
      //console.log("Este es el USER");
      //console.log(user);
    }

    /*
    POST REGISTER
    if (this.respuestaSearch !== null) {
      this.connection.postUser(form).subscribe((res: any) => {
        console.log(res);
      });
    }

    */

    //Guardar objeto usuario con los datos devueltos por el backend

    //console.log(this.connection.getUsername("pepe"));

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
