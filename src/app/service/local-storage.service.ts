import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  setItem(key:string,item:any):void{
    localStorage.setItem(key, JSON.stringify(item));
  }

  getItem(key:string):any{
    return  localStorage.getItem(key); 
  }
}
