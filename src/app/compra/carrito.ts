
import {Bolsa} from "./bolsa";

export class Carrito {
    listaBolsas: Array<Bolsa>;
    precioTotal: number;


  constructor() {
    this.listaBolsas = new Array<Bolsa>();
    this.precioTotal = 0;
  }
}
