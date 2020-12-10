import {Injectable} from '@angular/core';
import {Product} from '../../product';
import {until} from 'selenium-webdriver';
import {Usuario} from '../../user/usuario';
import {Carrito} from '../../compra/carrito';
import {AngularFirestore} from '@angular/fire/firestore';
import {Item} from '../../compra/Item';
import {Bolsa} from '../../compra/bolsa';



export class Respuesta {
  carrito:Carrito;
  resto:number;


  constructor(carrito: Carrito, resto: number) {
    this.carrito = carrito;
    this.resto = resto;
  }
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  maximo = 2000;

  constructor(private angularFirestore: AngularFirestore) {
  }

  public vaciarCarrito() {
    /*localStorage.setItem(this.carrito, null);
    let carro: Carrito = JSON.parse(localStorage.getItem(this.carrito));
    console.log('carrito vacio');
    console.log(carro);*/
  }

  public insertarProducto(producto: Product, cantidad: number) {
    console.log("#######################################agregando a carrito#########################")
    console.log(localStorage.getItem("usuario"));
    let usuario: Usuario = JSON.parse(localStorage.getItem('usuario')) as Usuario;
    console.log(usuario);
    let carrito: Carrito;
    console.log(usuario.shopCart);
    console.log(usuario.shopCart != undefined);
    if(Object.keys(usuario.shopCart).length !=0){
    carrito = usuario.shopCart;
    }
    else{
      carrito = new Carrito();
    }
    console.log(carrito);
    let indice = this.buscarBolsa(carrito, producto);
    console.log(indice);
    if (indice == -1) {
      console.log("indice -1")
      carrito = this.crearBolsa(carrito, producto, cantidad);
    } else {
      console.log("otro indice")
      let objeto:Respuesta = this.insertarActualizarProducto(carrito, indice, producto, cantidad);
      console.log(objeto);
      carrito = objeto.carrito;
      if (objeto.resto != 0){
        console.log("resto no -1")
        carrito = this.crearBolsa(carrito, producto, objeto.resto);
      }
      console.log(carrito);
    }
    usuario.shopCart = carrito;
    console.log(usuario);
    localStorage.setItem("usuario",JSON.stringify(usuario));
    console.log(localStorage.getItem("usuario"));
    this.angularFirestore.doc('Usuario/' + usuario.id).set(usuario).then(result=>
    {console.log("resultado-----------------------");
      console.log(result);});
  }

  insertarActualizarProducto(carrito:Carrito, indice:number, producto: Product,cantidad:number):Respuesta {
    let bolsa: Bolsa = carrito.listaBolsas[indice];
    let cant:number;
    let resto:number;
    if(cantidad<=this.maximo-bolsa.pesoTotal){
      cant = cantidad;
      resto = 0;
    }else{
      cant = this.maximo-bolsa.pesoTotal;
      resto = cantidad - cant;
    }

    let items:Array<Item>=bolsa.listaItem;
    let i:number = -1;
    if(items!=null){
    for(let index=0;index<items.length;index++){
      if(JSON.stringify(items[index].producto) === JSON.stringify(producto)){
        i = index;
        break;
      }
    }
    }else{
      items = new Array<Item>();
    }
    let item:Item;

    if(i== -1){
      item = new Item(producto,cant);
      items.push(item);
    }else{
      item = items[i];
      item.cantidad = item.cantidad+cant;
      items[i] = item;
    }
    bolsa.pesoTotal = bolsa.pesoTotal+cant;
    bolsa.listaItem = items;
    carrito.listaBolsas[indice] = bolsa;
    return new Respuesta(carrito,resto);
  }

  buscarBolsa(carrito:Carrito, producto:Product):number{
    let indice = -1;
    console.log(carrito.listaBolsas)
    if(carrito.listaBolsas != null) {
      for (let index = 0; index < carrito.listaBolsas.length; index++) {
        let bolsa: Bolsa = carrito.listaBolsas[index];
        console.log(bolsa);
        if (bolsa.precioRef == producto.ProductPrice && !bolsa.isClosed && bolsa.pesoTotal < this.maximo) {
          indice = index;
          break;
        }
      }
    }
    return indice;
  }

  private crearBolsa(carrito: Carrito, producto: Product, cantidad: number):Carrito {
    while(cantidad >0){
      let bolsa:Bolsa = new Bolsa(producto);
      let cant:number;
      if(cantidad <= this.maximo) {
        cant = cantidad;
        cantidad = 0
      }else{
        cant = this.maximo;
        cantidad = cantidad- this.maximo
        bolsa.isClosed = true;
      }
      bolsa.pesoTotal = cant;
      let item: Item = new Item(producto,cant);
      bolsa.listaItem.push(item);
      carrito.listaBolsas.push(bolsa);
      let precio = bolsa.precioRef*(cant/50);
      carrito.precioTotal=precio;
      return carrito;
    }
  }
}

