import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { AngularFirestore } from '@angular/fire/firestore'; 
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(public http: HttpClient, private angularFirestore: AngularFirestore) { }

getAllOrder() {  
  return this.angularFirestore.collection('Order').snapshotChanges();  
}  

//Adding new Order 
addOrderInforamtion(orderInfo) {  
  return this.angularFirestore.collection('Order').add(orderInfo);  
}  
//Update Existing Order
updateOrderInforamtion(orderid, orderInfo) {  
  delete orderInfo.id;  
  this.angularFirestore.doc('Order/' + orderid).update(orderInfo);  
}  

//Delete Order
deleteOrder(id) {  
  this.angularFirestore.doc('Order/' + id).delete();  
}  
}  