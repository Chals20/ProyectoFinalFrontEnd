export class Producto {
    id: number;
    name: string;
    amount: number;
    price: number;

    constructor(id:number,name:string,amount:number,price:number) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.price = price;
    }
}