import {Carrito} from '../compra/carrito';

export class Usuario {
    userId: string;
    fullName: string;
    phone: number;
    isAdmin: boolean = false;
    email: string;
    wishList: Array<string>;
    id: string;
    shopCart: Carrito;


  constructor() {
    this.wishList = new Array<string>();
    this.shopCart = new Carrito();
  }
}
