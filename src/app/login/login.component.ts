import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: String = '';
  pass: String = '';

  form: any = {
    email: null,
    pass: null,
  };

  login(): void {
    console.log(this.email + '\n' + this.pass);
  }

  handleSubmit() {
    console.log(); //Da undefined
  }
}
