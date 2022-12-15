import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../service/api/connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  json: any =[]
  constructor(private connection: ConnectionService){}
    ngOnInit(): void {
      this.connection.getSixDish().subscribe((res:any) =>{
        this.json = res;
      });  
    }
}
