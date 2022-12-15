import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  url:string = "http://proyectofinalbackend-production.up.railway.app";

  constructor(private http: HttpClient) { }

  getSixDish():Observable<any[]>{
    const send = this.url ;
    return  this.http.get<any>("https://proyectofinalbackend-production.up.railway.app/dishes/sixDish");
  }
}
