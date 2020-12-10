import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { AngularFirestore } from '@angular/fire/firestore'; 
@Injectable({
  providedIn: 'root'
})
export class CategoryService {  
  
  constructor(public http: HttpClient, private angularFirestore: AngularFirestore) {  
  }  
  
  getAllCategory() {  
    return this.angularFirestore.collection('Category').snapshotChanges();  
  }  
  
  //Adding new Category  
  addCategoryInforamtion(categoryInfo) {  
    return this.angularFirestore.collection('Category').add(categoryInfo);  
  }  
  //Update Existing Category
  updateCategoryInforamtion(categoryid, categoryInfo) {  
    delete categoryInfo.id;  
    this.angularFirestore.doc('Category/' + categoryid).update(categoryInfo);  
  }  
  
  //Delete Category
  deleteCategory(id) {  
    this.angularFirestore.doc('Category/' + id).delete();  
  }  
}  