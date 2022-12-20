import { Dish } from "./Dish";

export class Pedido {
    id: number;
    time: number;
    total: number;
    clienteId: number;
    listDish: Dish[];
    
    constructor(id: number,time: number,total: number,clienteId: number,listProductos: Dish[]){
        this.id= id;
        this.time= time;
        this.total= total;
        this.clienteId= clienteId;
        this.listDish= listProductos;
    }
}