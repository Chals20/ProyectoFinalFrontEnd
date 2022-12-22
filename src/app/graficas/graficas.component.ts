import { Component } from '@angular/core';
import {Chart,registerables} from 'node_modules/chart.js';
import { ConnectionService } from '../service/api/connection.service';
Chart.register(...registerables);

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})

export class GraficasComponent {

  constructor(private connection: ConnectionService){}
  tipoGrafica:any = "";
  jsonLabels: String[] = [];
  jsonData: number[] = [];
  chart: any = null;
  reload = [1,2,3,4];
  id: string = "";
  
  init():void{
    this.loadInfo();
    this.tipoGrafica = ["Todos los Productos","Platos Principales","Entrantes","Postres"];
  }
 
  RenderChart(){ 
  this.chart =  new Chart(this.id, {
      type: 'bar',
      data: {
        labels: this.jsonLabels,
        datasets: [{
          label: 'Data',
          data: this.jsonData,
          backgroundColor:[
          '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
          '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
          '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
          '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
          '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
          '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
          '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
          '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
          '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
          '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  loadInfo():void{
    this.connection.getSalesAll().subscribe((res:any) =>{
      this.allData(res);
    });
  }

  allData(res:any){
    res.forEach((e:any) => {
      this.jsonLabels.push(e.name);
      this.jsonData.push(e.count);
    });
    this.id = "todos";
    this.RenderChart();
    this.PostresData(res);
  }
  PostresData(res:any){
    this.clearJson();
    res.forEach((e:any)  => {
      if(e.type == "Postre"){
        this.jsonLabels.push(e.name);
        this.jsonData.push(e.count);
      }
    });
    this.id = "postres";
    this.RenderChart();
    this.PrincipalData(res);
  }
  PrincipalData(res:any){
    this.clearJson();
    res.forEach((e:any)  => {
      if(e.type == "Principal"){
        this.jsonLabels.push(e.name);
        this.jsonData.push(e.count);
      }
    });
    this.id = "principal";
    this.RenderChart();
    this.EntrantesData(res);
  }
  EntrantesData(res:any){
    this.clearJson();
    res.forEach((e:any)  => {
      if(e.type == "Entrantes"){
        this.jsonLabels.push(e.name);
        this.jsonData.push(e.count);
      }
    });
    this.id = "entrantes";
    this.RenderChart();
  }
  clearJson():void{
    this.jsonData = [];
    this.jsonLabels = [];
  }


}
