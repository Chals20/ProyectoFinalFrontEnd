import { Component, OnInit} from '@angular/core';
import { User } from './models/User';
import { LocalStorageService } from './service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Menjador';

  constructor(private localstorage: LocalStorageService){}

  ngOnInit(): void {

    // Patron Singleton
    if (this.localstorage.getItem("user") == null){
      const user : User = new User(0,"","","","USER");
      this.localstorage.setItem("user",user);
    }

    this.localstorage.setItem("carrito",[]);

  }
}
