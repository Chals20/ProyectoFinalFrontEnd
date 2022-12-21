import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//const AUTH_URL = 'URL del railway';

const AUTH_URL = 'http://localhost:8080/users/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient) { }

  login(username:string, password:string): any{
    return this.http.post(AUTH_URL + 'login', {
      username,
      password
    }, httpOptions);
  }

}
