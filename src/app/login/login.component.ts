import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: String = '';
  pass: String = '';

  url: String = "http://localhost:8080/users/";


  form: any = {
    email: null,
    pass: null,
  };

  jsonCarrito: User[] = [];

  //constructor(private loginService: LoginService) {}
  //constructor(private http:HttpClient) {}
  constructor(){}

  login(): void {
    console.log(this.email + '\n' + this.pass);
  }



  handleSubmit() {
    console.log('LOGIN');


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
