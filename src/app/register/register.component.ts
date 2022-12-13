import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username:String = "";
  pass1:String= "";
  pass2:String= "";
  phone:String= "";
  email1:String= "";
  email2:String= "";




  register(): void {
    console.log(this.username + "\n" + this.email1 + "\n" + this.pass1 + "\n" + this.phone)



  }
}
