import { Dish } from "./Dish";

export class Order{
    id: number;
    date: string;
    hora: number;
    listDish: Dish[];
    total:number;

    constructor(id:number,date:string,hora:number,listDish:Dish[],total:number){
        this.id = id,
        this.date = date,
        this.hora = hora,
        this.listDish = listDish,
        this.total = total
    }
    
}