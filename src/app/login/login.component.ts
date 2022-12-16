import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
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
  username: String = '';

  url = "http://proyectofinalbackend-production.up.railway.app/users";

  url2= "https://httpbin.org/post";



  json: any;

  //jsonCarrito;

  //constructor(private loginService: LoginService) {}
  constructor(private http:HttpClient, private storage:LocalStorageService) {}

  login(): void {
    console.log(this.email + '\n' + this.pass);
  }



  handleSubmit() {
    const form = {
      email: this.email,
      pass: this.pass,
      username: this.username
    };

    console.log('LOGIN');

    this.http.post(this.url2, form).toPromise().then((data:any) => {
      console.log(data);
      this.json = JSON.stringify(data.json);
      console.log(this.json);
      this.storage.setItem("username",this.username)
      this.storage.setItem("email",this.email)
      this.storage.setItem("password",this.pass)
      console.log("Salimos de storage")
    })


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
