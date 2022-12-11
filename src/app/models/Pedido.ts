import { Producto } from "./Producto"

export class Pedido {
    id: number;
    time: number;
    total: number;
    clienteId: number;
    listProductos: Producto[];
    
    constructor(id: number,time: number,total: number,clienteId: number,listProductos: Producto[]){
        this.id= id;
        this.time= time;
        this.total= total;
        this.clienteId= clienteId;
        this.listProductos= listProductos;
    }
}