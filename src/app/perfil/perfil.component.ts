import { Component } from '@angular/core';
import { User } from '../models/User';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  user:User = {
    id : 0,
    userName : "Chals",
    email : "chals@gmail.com",
    password : "1234",
    rol : "USER"
  }
}
