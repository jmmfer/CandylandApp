import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { Product } from '../product';
import { map } from 'rxjs/operators';
import {CartService} from './services/cart.service';
import { Subject } from 'rxjs';
import { AppComponent} from '../app.component'
import { WishListService } from '../wishlist/wishlist.service';
import { ProductService } from '../product.service';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  Product: Array<Product> = new Array<Product>();
  Product2: Observable<any[]>;
  productSelected: Product;
  public productsList: any[];
  public productsListBackup: any[];
  cantidad : number;
  filtro:string;
  allProduct:Array<Product> = new Array<Product>();

  constructor(db: AngularFirestore, public app: AppComponent, private wishlistService: WishListService, private productService: ProductService, private cartService: CartService) {

    this.productService.getAllProduct().subscribe((data: any) => {
      this.allProduct = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Product;
      });
      this.Product = this.allProduct;

    });
  }

    ngOnInit(): void {

  /* combineLatest(this.startobs, this.endobs).subscribe((value) => {
     this.firequery(value[0], value[1]).subscribe((products)=> {
       this.products = products;
     })
    })*/
  }
  isloggedin(){
    return this.app.isLoggedIn();
  }



  cargarModal(Product){
    this.productSelected = Product;


  }

  insertarProducto(){
    this.cartService.insertarProducto(this.productSelected,this.cantidad);
  }

  vaciarCarrito(){
    this.cartService.vaciarCarrito();
  }

  filtrar():void{
    console.log("Entro en el filtro");
    let src = this;
    if(this.filtro ===""){

      this.Product= this.allProduct;
    }else{
      this.Product = this.allProduct.filter(function(prod){
        console.log(prod.ProductName);
        console.log(src.filtro);
        console.log(prod.ProductName.includes(src.filtro));
        console.log(prod.CategoryName);
        console.log(prod.CategoryName.includes((src.filtro)));
        return prod.ProductName.toLowerCase().includes(src.filtro.toLowerCase()) || prod.CategoryName.toLowerCase().includes((src.filtro.toLowerCase()));
      });

    }
  }

  addProduct(productId ){
    let usuario = JSON.parse(localStorage.getItem("user"));
    console.log(productId)
    this.wishlistService.addWishlistInforamtion(productId);
    console.log(this.wishlistService.getWishList());
    }




 
}
