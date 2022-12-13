export class User{
    id: number;
    userName: string;
    email: string;
    password: string;
    rol: string;

    constructor(id: number, userName: string, email: string, password: string, rol: string){
            this.id = id;
            this.userName = userName;
            this.email = email;
            this.password = password;
            this.rol = rol;
        }
}

