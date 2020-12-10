import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { AngularFirestore } from '@angular/fire/firestore';  

@Injectable({
  providedIn: 'root'
})
export class MetopService {
  constructor(public http: HttpClient, private angularFirestore: AngularFirestore) {  
  }  
  
  getAllMetop() {  
    return this.angularFirestore.collection('Metop').snapshotChanges();  
  }  
  
  //Adding new Metop 
  addMetopInforamtion(metopInfo) {  
    return this.angularFirestore.collection('Metop').add(metopInfo);  
  }  
  //Update Existing Metop
  updateMetopInforamtion(metopid, metopInfo) {  
    delete metopInfo.id;  
    this.angularFirestore.doc('Metop/' + metopid).update(metopInfo);  
  }  
  
  //Delete Metop
  deleteMetop(id) {  
    this.angularFirestore.doc('Metop/' + id).delete();  
  }  
}  