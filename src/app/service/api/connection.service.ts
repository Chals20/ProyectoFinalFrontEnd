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

  getDishOrder(id:number):Observable<any>{
    const send = this.url + "/dishes/findByOrder/"+id;
    return this.http.get<any>(send);
  }

  getOrderByUser(id:number,date:string):Observable<any>{
    const send = this.url + "/orders/searchOrder/" +id + "/ "+ date;
    return this.http.get<any>(send);
  }

  getOrderByDate(date:string):Observable<any>{
    const send = this.url + "/orders/searchOrderByDate/"+ date;
    return this.http.get<any>(send);
  }
}
