import { Component } from '@angular/core';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent {

flagMenu: boolean = false;
flagUser: boolean = false;
mostrarMenu():void {
    if(!this.flagMenu) this.flagMenu = true;
    else this.flagMenu =  false;
}

userInside(): void{
this.flagUser = true;
}


}
