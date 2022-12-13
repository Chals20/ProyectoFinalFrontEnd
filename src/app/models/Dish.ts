export class Dish {
    id:number;
    name:string;
    img:string;
    price: number;
    category:string;
    alergeno:boolean[];
    amount : number = 0;

    constructor(id:number,name:string,img:string,price: number,category:string,alergeno:boolean[],amount:number){
        this.id = id;
        this.name = name;
        this.img = img;
        this.price = price;
        this.category =  category;
        this.alergeno = alergeno;
        this.amount = amount;
    }
}
