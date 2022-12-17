import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
    private connection: ConnectionService
  ) {}

  register(): void {
    console.log(
      this.username + '\n' + this.email1 + '\n' + this.pass1 + '\n' + this.phone
    );
  }

  handleSubmit() {
    const form = {
      username: this.username,
      email: this.email1,
      password: this.pass1,
      rol: {
        id: 2,
      },
    };

    //Primero comprobamos si el email o el username estan cogidos:
    this.connection.getIfExistsByEmail(form.email).subscribe((res: any) => {
      console.log('Esto es respuesta de getIfExistsbyEmail ' + res);
      this.respuestaSearchEmail = res;
    });

    if (this.respuestaSearchEmail === true) {
      this.connection
        .getIfExistsByUsername(form.username)
        .subscribe((res: any) => {
          console.log('Esto es respuesta de getIfExistsByUsername ' + res);
          this.respuestaSearchUser = res;
        });
    }

    //Si no ha encontrado NINGUNO de ellos significa que podemos crear el usuario nuevo
    if (!this.respuestaSearchUser && !this.respuestaSearchEmail) {
      this.connection.postUser(form).subscribe((res: any) => {
        console.log('Esto es la respuesta de postUser ' + res);
        this.respuestaPostUser = res;
      });

      //Volvemos a buscar el usuario que ahora si que estara en la base de datos para obtener todos los datos
      //incluido el ID que depende del backend
      if (this.respuestaSearchEmail === true) {
        this.connection
          .getIfExistsByUsername(form.username)
          .subscribe((res: any) => {
            console.log('Esto es respuesta de getIfExistsByUsername ' + res);
            this.respuestaSearchUser = res;
          });
      }
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
  }
}
