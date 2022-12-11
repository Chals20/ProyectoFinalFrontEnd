import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  json:any = [
    {
        "id": 1,
        "name": "Arroz con Pollo",
        "img": "https://i.ibb.co/pXRcYcC/image.png",
        "price": 10.5,
        "category": {
            "id": 2,
            "name": "Principal"
        },
        "alergeno": {
            "id": 5,
            "lacteos": false,
            "gluten": false,
            "vegan": true
        }
    },
    {
        "id": 2,
        "name": "Patatas Bravas",
        "img": "https://i.ibb.co/sPnNyYT/image.png",
        "price": 7.3,
        "category": {
            "id": 1,
            "name": "Entrantes"
        },
        "alergeno": {
            "id": 2,
            "lacteos": false,
            "gluten": false,
            "vegan": false
        }
    },
    {
        "id": 3,
        "name": "Pan con Alioli",
        "img": "https://i.ibb.co/5K3b0qL/image.png",
        "price": 3.0,
        "category": {
            "id": 1,
            "name": "Entrantes"
        },
        "alergeno": {
            "id": 1,
            "lacteos": true,
            "gluten": true,
            "vegan": true
        }
    },
    {
        "id": 4,
        "name": "Aceitunas",
        "img": "https://i.ibb.co/MBK6Rxg/image.png",
        "price": 2.0,
        "category": {
            "id": 1,
            "name": "Entrantes"
        },
        "alergeno": {
            "id": 2,
            "lacteos": false,
            "gluten": false,
            "vegan": false
        }
    },
    {
        "id": 5,
        "name": "Pizza Margarita",
        "img": "https://i.ibb.co/QrJyVSD/image.png",
        "price": 11.0,
        "category": {
            "id": 2,
            "name": "Principal"
        },
        "alergeno": {
            "id": 1,
            "lacteos": true,
            "gluten": true,
            "vegan": true
        }
    },
    {
        "id": 6,
        "name": "Pizza 4 Quesos",
        "img": "https://i.ibb.co/rQN6BRD/image.png",
        "price": 14.0,
        "category": {
            "id": 2,
            "name": "Principal"
        },
        "alergeno": {
            "id": 1,
            "lacteos": true,
            "gluten": true,
            "vegan": true
        }
    },
    {
        "id": 7,
        "name": "Pizza Vegana",
        "img": "https://i.ibb.co/JdnHCqD/image.png",
        "price": 11.0,
        "category": {
            "id": 2,
            "name": "Principal"
        },
        "alergeno": {
            "id": 3,
            "lacteos": false,
            "gluten": true,
            "vegan": false
        }
    },
    {
        "id": 8,
        "name": "Pizza Sin Glutten",
        "img": "https://i.ibb.co/KsN5kY3/image.png",
        "price": 11.0,
        "category": {
            "id": 2,
            "name": "Principal"
        },
        "alergeno": {
            "id": 6,
            "lacteos": true,
            "gluten": false,
            "vegan": true
        }
    },
    {
        "id": 9,
        "name": "Empanda Jamon y Queso",
        "img": "https://i.ibb.co/5KLRspW/image.png",
        "price": 2.0,
        "category": {
            "id": 1,
            "name": "Entrantes"
        },
        "alergeno": {
            "id": 1,
            "lacteos": true,
            "gluten": true,
            "vegan": true
        }
    },
    {
        "id": 10,
        "name": "Empanda de Carne",
        "img": "https://i.ibb.co/5KLRspW/image.png",
        "price": 2.0,
        "category": {
            "id": 1,
            "name": "Entrantes"
        },
        "alergeno": {
            "id": 4,
            "lacteos": false,
            "gluten": true,
            "vegan": true
        }
    },
    {
        "id": 11,
        "name": "Empanda Vegana",
        "img": "https://i.ibb.co/5KLRspW/image.png",
        "price": 2.0,
        "category": {
            "id": 2,
            "name": "Principal"
        },
        "alergeno": {
            "id": 3,
            "lacteos": false,
            "gluten": true,
            "vegan": false
        }
    },
    {
        "id": 12,
        "name": "ChesseCake",
        "img": "https://i.ibb.co/sQ0KR2Q/image.png",
        "price": 8.0,
        "category": {
            "id": 3,
            "name": "Postre"
        },
        "alergeno": {
            "id": 1,
            "lacteos": true,
            "gluten": true,
            "vegan": true
        }
    },
    {
        "id": 13,
        "name": "Helado de Vainilla",
        "img": "https://i.ibb.co/GPpT2Q7/image.png",
        "price": 5.0,
        "category": {
            "id": 3,
            "name": "Postre"
        },
        "alergeno": {
            "id": 6,
            "lacteos": true,
            "gluten": false,
            "vegan": true
        }
    },
    {
        "id": 14,
        "name": "Tiramizu vegano",
        "img": "https://i.ibb.co/1rZqsFT/image.png",
        "price": 6.3,
        "category": {
            "id": 3,
            "name": "Postre"
        },
        "alergeno": {
            "id": 3,
            "lacteos": false,
            "gluten": true,
            "vegan": false
        }
    }
]
}
