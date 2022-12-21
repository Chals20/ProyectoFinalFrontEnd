import { Dish } from "./Dish";

export class Order{
    id: number;
    date: string;
    hora: number|string;
    listDish: Dish[];
    total:number;
    user:any|null;

    constructor(id:number,date:string,hora:number|string,listDish:Dish[],total:number,
        ){
        this.id = id,
        this.date = date,
        this.hora = hora,
        this.listDish = listDish,
        this.total = total
        this.user
        this.user = null;
    }

    setUser(id:number|null,name:string|null,email:string|null){
        this.user = {id,name,email};
    }
    //user:{idUser:number,name:string,email:string}
}
