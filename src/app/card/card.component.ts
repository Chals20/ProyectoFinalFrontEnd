import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  json:any = [
    {
        "id": 1,
        "name": "Arroz con Pollo",
        "img": "URL im1",
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
        "img": "URL",
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
        "img": "URL",
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
        "img": "URL",
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
        "img": "URL img2",
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
        "img": "URL img3",
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
        "img": "URL img2",
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
        "img": "URL img2",
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
        "img": "URl",
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
        "img": "URl",
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
        "img": "URl",
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
        "img": "URL img3",
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
        "img": "URL img3",
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
        "img": "URL img3",
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
