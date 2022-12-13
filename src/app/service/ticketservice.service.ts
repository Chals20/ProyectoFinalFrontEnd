import { Injectable,Output,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketserviceService {
  @Output() disparadorTicket: EventEmitter<any> = new EventEmitter();
  constructor() { }
}
