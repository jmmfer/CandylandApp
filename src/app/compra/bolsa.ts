import {Product} from '../product';
import {Item} from './Item';


export class Bolsa {
  precioRef: number;
  listaItem: Array<Item>;
  pesoTotal: number;
  isClosed: boolean;

  constructor(producto: Product) {
    this.precioRef = producto.ProductPrice;
    this.listaItem = new Array<Item>();
    this.pesoTotal = 0;
    this.isClosed = false;
  }
}
