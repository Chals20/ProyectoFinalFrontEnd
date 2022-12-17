export class Search {

    type:number;
    name:string;
    pmin:number;
    pmax:number;
    glutten:boolean;
    lactosa:boolean;
    vegan:boolean;
    constructor(type:number,name:string,pmin:number,pmax:number,gluten:boolean,
        lactosa:boolean,vegan:boolean){
        this.type  = type;
        this.name = name;
        this.pmin = pmin;
        this.pmax = pmax;
        this.glutten = gluten;
        this.lactosa = lactosa;
        this.vegan = vegan;
    }
}