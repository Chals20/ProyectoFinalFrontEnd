import { Component, OnInit } from '@angular/core';
import { Dish } from '../models/Dish';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { ConnectionService } from '../service/api/connection.service';
import { LocalStorageService } from '../service/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  constructor(
    private connection: ConnectionService,
    private localStorage: LocalStorageService,
    public router: Router
  ) {}
  user: User = new User(0, '', '', '', 'USER');
  response: any;
  json: Order[] = [];

  ngOnInit(): void {
    const aux = JSON.parse(this.localStorage.getItem('user'));
    this.user = aux;
  }

  loadPedidos():void{
    this.json=[];
    const Swal = require('sweetalert2');
    Swal.fire({
      title: 'Cargando Datos...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      background: '#19191a',
      showConfirmButton: false,
      timer: 1000,
    });
    this.connection.getOrderByUser(this.user.id,this.dateToBack()).subscribe((res:any)  =>{
      this.loadJson(res);
  });
  }

  //transforma el formato dia como el back end lo acepta;
  dateToBack():string{
    const date = new Date();
    const str = date.toLocaleString();
    let day = "";
    for (let index = 0; index < str.length; index++) {
        if(str[index] != "/") day+=str[index];
        else break;
    }
    const result = date.getFullYear() + "-"+ (date.getMonth()+1) + "-"+ day;
    return result;
}

  loadJson(res: any): void {
    if (res.length != 0) {
      res.forEach((e: any) => {this.json.push(new Order(e.id,this.chanceDate(e.date),
       this.chanceHora(e.hora),this.getDish(e.id),e.total));
      });
    } else {
      const Swal = require('sweetalert2');
      Swal.fire({
        title: 'No hay pedidos',
        icon: 'error',
        confirmButtonColor: '#FEBA0B',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  getDish(id: number): Dish[] {
    let listDish: Dish[] = [];
    this.connection.getDishOrder(id).subscribe((res: any) => {
      res.forEach((e: any) => {
        listDish.push(new Dish(e.id, e.name, e.img, e.price, null, null, e.amount));
      });
    });
    return listDish;
  }

  //mod date of back
  chanceDate(date: any): any {
    let fecha: string = new Date(date).toLocaleDateString();
    return fecha;
  }

  showDish(order: Order): void {
    let show = '';
    order.listDish.forEach((e: Dish) => {
      const string = `${e.name}: ${e.price}€ x ${e.amount} = ${
        e.price * e.amount
      } </br> `;
      show += string + '\n';
    });
    const Swal = require('sweetalert2');
    Swal.fire({
      title: 'Pedido',
      html: show,
      confirmButtonColor: '#FEBA0B',
      confirmButtonText: 'Aceptar',
    });
  }

  logout(){
    const Swal = require('sweetalert2');
    Swal.fire({
      title: 'Quieres cerrar sesión?',
      showDenyButton: true,
      confirmButtonColor: "#FEBA0B",
      confirmButtonText: 'Si',
      customClass: {
        actions: 'my-actions',
        cancelButtonColor: '#C70039',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.localStorage.logOut('user');
        this.router.navigate(['/home']);
        Swal.fire({
          title: 'Hasta la Próxima',
          confirmButtonColor: "#FEBA0B",
          confirmButtonText: 'Aceptar'
      });
      }
    })
  }

  // formatea la hora para mostrarla
  chanceHora(hora:number):string{
    const aux = String(hora);
    let result:string = aux;
     if(aux.length == 2) result = aux+".00";
    else if(aux.length == 4)result = aux+"0";
    return result;
}

chancePassword(){
  const rol = {id:2,
              name:"USER"}
  const body = {id: this.user.id,userName:this.user.userName,
    email:this.user.email,password:this.user.password,rol:rol}
  this.connection.postUpdateUser(this.user.id,body).subscribe((res:any) => {
    alert(res);
  });
  const Swal = require('sweetalert2');
  Swal.fire({
    title: 'Contraseña Actualizada',
    icon: 'success',
    confirmButtonColor: "#FEBA0B",
    confirmButtonText: 'Aceptar'
});
}

deleteOrder(time:any,id:number):void{

  console.log(new Date("22/12/2022") + "---" +new Date());
 // if(new Date(time) < new Date()){
    this.connection.deleteOrder(id).subscribe((res:any) => {
      this.loadPedidos();
    });

  //}else{
    /*
    const Swal = require('sweetalert2');
    Swal.fire({
      title: 'No puede cancelar el pedido el mismo día de entrega',
      icon: 'error',
      confirmButtonColor: "#FEBA0B",
      confirmButtonText: 'Aceptar'
  });*/
  //}
}

//kit spinner
flagSpinner:boolean = false;
timeSpinner(timer:number){
  this.chanceFlagSpinner();
  setTimeout(() => {
    this.chanceFlagSpinner();
  }, timer);
}
chanceFlagSpinner():void{this.flagSpinner = (this.flagSpinner)?false:true;}
}
