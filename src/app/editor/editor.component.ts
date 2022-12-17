import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { ConnectionService } from '../service/api/connection.service';
import { SearchService } from '../service/search.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  json: any = [];
  constructor(
    private connection: ConnectionService,
    private search: SearchService
  ) {}

  async boton(){
    const Swal = require('sweetalert2');
    console.log("1");

    Swal.fire({
      title: 'success',
      text: 'Session iniciada correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
    await delay(5000);

    console.log("2");

    Swal.fire({
      title: 'success',
      text: 'Session iniciada correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
    await delay(1000);

    console.log("3");

    Swal.fire({
      title: 'success',
      text: 'Session iniciada correctamente',
      icon: 'success',
      confirmButtonText: 'Aceptar',
    });
    console.log("4");


  }


  ngOnInit(): void {
    this.connection.getSixDish().subscribe((res: any) => {
      this.json = res;
    });
    this.search.disparador.subscribe((data: any) => {
      const body = data.data;
      console.log(body);
      this.connection.postSearch(body).subscribe((res: any) => {
        this.json = res;
        console.log(res);
      });
    });
  }
}
