import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from 'src/app/models/Dish';
import { Search } from 'src/app/models/Search';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
  }),
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  url:string = "https://proyectofinalbackend-production.up.railway.app";

  constructor(private http: HttpClient) { }

  getSixDish():Observable<any[]>{
    const send = this.url + "/dishes/sixDish";
    return  this.http.get<any>(send);
  }

  postSearch(body: any):Observable<any>{
    const send = this.url + "/dishes/buscador"
    return this.http.post<any>(send,body);
  }



  //Login

  getIfExistsByUsername(user: String):Observable<any>{
    const send = this.url + `/user/findByUsername/${user}`;
    return  this.http.get<any>(send);
  }

  getIfExistsByEmail(email: String):Observable<any>{
    const send = this.url + `/user/findByEmail/${email}`;
    return  this.http.get<any>(send);
  }

  getUsernameLogin(user: String, pass: String):Observable<any>{
    const send = this.url + `/user/logIn/${user}/${pass}`;
    return  this.http.get<any>(send);
  }

  postUser(body: any):Observable<any>{
    const send = this.url + "/user/save"
    return this.http.post<any>(send,body);
  }

}
