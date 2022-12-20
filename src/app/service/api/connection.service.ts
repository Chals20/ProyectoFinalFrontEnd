import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from 'src/app/models/Dish';
import { Search } from 'src/app/models/Search';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ConnectionService {
  url: string = 'https://proyectofinalbackend-production.up.railway.app';

  constructor(private http: HttpClient) {}
  //retorna los primeros platos del home
  getSixDish(): Observable<any[]> {
    const send = this.url + '/dishes/sixDish';
    return this.http.get<any>(send);
  }

  //buscador avanzado
  postSearch(body: any): Observable<any> {
    const send = this.url + '/dishes/buscador';
    return this.http.post<any>(send, body);
  }

  //obtiene los platos de una orden por id
  getDishOrder(id: number): Observable<any> {
    const send = this.url + '/dishes/findByOrder/' + id;
    return this.http.get<any>(send);
  }
  //retorna las ordenes de un usuario date >=
  getOrderByUser(id: number, date: string): Observable<any> {
    const send = this.url + '/orders/searchOrder/' + id + '/' + date;
    return this.http.get<any>(send);
  }

  //retora todos las ordenes de un date especifico (ADMIN)
  getOrderByDate(date: string): Observable<any> {
    const send = this.url + '/orders/searchOrderByDate/' + date;
    return this.http.get<any>(send);
  }

  postNewOrder(order: any): Observable<any> {
    const send = this.url + '/orders/save';
    return this.http.post<any>(send, order);
  }

  postNewListDishOrder(body: any): Observable<any> {
    const send = this.url + '/dishorders/saveList';
    return this.http.post<any>(send, body);
  }

  //Update de un plato a través de su ID
  updateDishFromId(id: any, order: any): Observable<any> {
    const send = this.url + `/dishes/update/${id}`;
    return this.http.put<any>(send, order);
  }

  //Crea nuevo plato
  postNewDish(order: any): Observable<any> {
    const send = this.url + '/dishes/save';
    return this.http.post<any>(send, order);
  }

  //Elimina un plato
  deleteDishFromId(id: any): Observable<any> {
    const send = this.url + `/dishes/delete/${id}`;
    return this.http.delete<any>(send);
  }

  //// Login ////

  getIfExistsByUsername(user: String): Observable<any> {
    const send = this.url + `/user/findByUsername/${user}`;
    return this.http.get<any>(send);
  }

  getIfExistsByEmail(email: String): Observable<any> {
    const send = this.url + `/user/findByEmail/${email}`;
    return this.http.get<any>(send);
  }

  getUsernameLogin(user: String, pass: String): Observable<any> {
    const send = this.url + `/user/logIn/${user}/${pass}`;
    return this.http.get<any>(send);
  }

  postUser(body: any): Observable<any> {
    const send = this.url + '/user/save';
    return this.http.post<any>(send, body);
  }
}
