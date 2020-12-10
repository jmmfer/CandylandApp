import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service'
import { Bolsa } from './compra/bolsa';
import { Carrito } from './compra/carrito';
import { Product } from './product';
import {UsuarioService} from "../app/user/usuario.service";

import { Usuario } from './user/usuario'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'CandylandApp';
  carrito: Carrito = new Carrito;
  //const PESO_MAX = 2000;

  

  constructor(
    protected authService:AuthService
  ) {
  }
  
  isLoggedIn():boolean{
    return JSON.parse(localStorage.getItem('user'))!==null;
   }

   logout(){
    this.authService.logout()
  }

  adminIsLoggedIn():boolean{
    let v = (localStorage.getItem('usuario'));
    //console.log(v)
    if (v != 'undefined' && v != 'null'){
      let o = JSON.parse(v);
      return o.isAdmin === true;
    } else {
      return false;}
    
    

  }

  //Esto es lo del carrito

  insertarProducto(producto: Product, cantidad: number){
   alert("Se inserto producto")


  }

  eliminarProducto(producto: Product){

  }


  modificarProducto(producto: Product, cantidad: number){

  }

  vaciarCarrito(){}


  existeProducto(producto: Product): boolean {
    return true;
  }

  obtenerPesoProducto(producto: Product): number{
    return 1;
  }




}
