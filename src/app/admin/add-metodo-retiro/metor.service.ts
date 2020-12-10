import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { AngularFirestore } from '@angular/fire/firestore';  

@Injectable({
  providedIn: 'root'
})
export class MetorService {

  constructor(public http: HttpClient, private angularFirestore: AngularFirestore) {  
  }  
  
  getAllMetor() {  
    return this.angularFirestore.collection('Metor').snapshotChanges();  
  }  
  
  //Adding new Metor  
  addMetorInforamtion(metorInfo) {  
    return this.angularFirestore.collection('Metor').add(metorInfo);  
  }  
  //Update Existing Metor
  updateMetorInforamtion(metorid, metorInfo) {  
    delete metorInfo.id;  
    this.angularFirestore.doc('Metor/' + metorid).update(metorInfo);  
  }  
  
  //Delete Metor
  deleteMetor(id) {  
    this.angularFirestore.doc('Metor/' + id).delete();  
  }  
}  