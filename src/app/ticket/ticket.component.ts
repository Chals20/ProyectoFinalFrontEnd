import { Component,OnInit } from '@angular/core';
import { Dish } from '../models/Dish';
import { TicketserviceService } from '../service/ticketservice.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit{

  constructor(private ticketService: TicketserviceService){}
  jsonCarrito: Dish[] = [];

  ngOnInit():void {
    this.ticketService.disparadorTicket.subscribe(data => {
      this.jsonCarrito = data;
    console.log(data.data);});
    console.log(this.jsonCarrito);
  }

}
