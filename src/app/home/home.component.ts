import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../service/api/connection.service';
import { LocalStorageService } from '../service/local-storage.service';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  json: any =[]
  constructor(private connection: ConnectionService,
    private search: SearchService){}
    ngOnInit(): void {
      this.connection.getSixDish().subscribe((res:any) =>{
        this.json = res;
      });  
      this.search.disparador.subscribe((data:any) => {
        const body = data.data;
        console.log(body);
        this.connection.postSearch(body).subscribe((res:any) => {
          this.json = res;
          console.log(res);
       });;
      });
    }
}
