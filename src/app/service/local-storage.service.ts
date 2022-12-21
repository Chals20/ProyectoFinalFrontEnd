import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {


  user : User = new User(0,"","","","USER");

  constructor() {}

  setItem(key:string,item:any):void{
    localStorage.setItem(key, JSON.stringify(item));
  }

  getItem(key:string):any{
    return  localStorage.getItem(key);
  }

  logOut(key:string):void{
    localStorage.setItem(key, JSON.stringify(this.user));
  }

  remove(key:string):void{
    localStorage.removeItem(key);
  }

}
