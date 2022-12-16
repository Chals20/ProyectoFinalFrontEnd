import { EventEmitter, Injectable, Output } from '@angular/core';
import { Search } from '../models/Search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  @Output() disparador: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
