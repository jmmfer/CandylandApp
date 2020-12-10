import { Component, OnInit } from '@angular/core';
import { Product } from '../../product';  
import { ProductService } from '../../product.service';  
import { AngularFirestore } from '@angular/fire/firestore';  
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
import { CategoryService } from '../add-category/category.service';  
import { Category } from '../add-category/category';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent {  
  
  updateProduct: boolean = false;  
  products: Product[];  
  Product: Product= new Product();  
  productId = null;  
  isToggle: boolean = false;  
  formSubmitted: boolean;  
  isDelete: boolean;  

  categorys: Category[];
  

  title = "cloudsSorage";
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  fileLoaded;

  
  
  constructor(private productService: ProductService,  
    private angularFirestore: AngularFirestore,
    private categoryService: CategoryService, 
    private storage: AngularFireStorage
    
  ) {  
    this.getAllProduct();  
    this.getAllCategory();
  }  
  
  getAllProduct() {  
    this.productService.getAllProduct().subscribe((data: any) => {  
      this.products = data.map(e => {  
        return {  
          id: e.payload.doc.id,  
          ...e.payload.doc.data()  
        } as Product;  
      });  
      console.log(this.products);  
  
    });  
  }  

  getAllCategory() {  
    this.categoryService.getAllCategory().subscribe((data: any) => {  
      this.categorys= data.map(e => {  
        return {  
          id: e.payload.doc.id,  
          ...e.payload.doc.data()  
        } as Category;  
      });  
      console.log(this.categorys);  
  
    });  
  }  
  
 
 



  onSubmit(f) {  
    if (f.form.valid) {
      const ProductData:Product = JSON.parse(JSON.stringify(this.Product));
      debugger;
      var n = Date.now();
      const filePath = `ImagenesProductos/${n}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(`ImagenesProductos/${n}`, this.fileLoaded);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = fileRef.getDownloadURL();
            console.log("#####################")
            console.log(this.downloadURL)
            this.downloadURL.subscribe(url => {
              console.log(url)
              if (url) {
                this.fb = url;
                ProductData.Image = url;
                console.log(ProductData);
                if (this.productId == null) {
                  this.productService.addProductInforamtion(ProductData);
                } else {
                  this.productService.updateProductInforamtion(this.productId, ProductData);
                }
                this.Product= new Product();
                f.submitted = false;
                this.formSubmitted = true;
                this.updateProduct = false;
                setInterval(() => {
                  this.formSubmitted = false;

                }, 2000);
              }
              console.log(this.fb);

            });
          })
        )
        .subscribe(url => {
          if (url) {
            console.log(url);
          }
        });



    }
  }  
  
  //Edit Product method  
  editProduct(productId) {  
    this.productId = productId;  
    let obj: any = this.products.filter((x: any) => {  
      return x.id == productId;  
    });  
    this.updateProduct = true;  
    this.Product = obj[0];  
  }  
  
  // Delete Product method  
  deleteProduct(productId) {  
    if (confirm('Please note! This action can NOT be undone. Are you sure you want to delete?')) {  
  
      this.productService.deleteProduct(productId);  
      this.isDelete = true;  
      setInterval(() => {  
        this.isDelete = false;  
      }, 2000);  
    }  
  }  

  onFileSelected(event) {
    this.fileLoaded = event.target.files[0];
}

}
  
  
