import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';  
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreModule} from '@angular/fire/firestore'; 

  
@Injectable({  
  providedIn: 'root'  
})  
export class ProductService {  
  
  constructor(public http: HttpClient, private angularFirestore: AngularFirestore) {  
  }  
  
  getAllProduct() {  
    return this.angularFirestore.collection('Product').snapshotChanges();  
  }  
  
  //Adding new Product
  addProductInforamtion(productInfo) {  
    return this.angularFirestore.collection('Product').add(productInfo);  
  }  
  //Update Existing Product
  updateProductInforamtion(productid, productInfo) {  
    delete productInfo.id;  
    this.angularFirestore.doc('Product/' + productid).update(productInfo);  
  }  
  
  //Delete Product
  deleteProduct(id) {  
    this.angularFirestore.doc('Product/' + id).delete();  
  }  
}  
