import { Injectable,Output,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoserviceService {
  @Output() disparadorCarrito: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
