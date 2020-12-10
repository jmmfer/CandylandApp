import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { AngularFirestore } from '@angular/fire/firestore'; 
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'

})
export class UsuarioService {

  constructor(public http: HttpClient, private angularFirestore: AngularFirestore) {  
  }  
  
  getAllUsuario() {  
    return this.angularFirestore.collection('Usuario').snapshotChanges();  
  }  

 

  //Adding new Usuario  
  addUsuarioInforamtion(UsuarioInfo) {  
    return this.angularFirestore.collection('Usuario').add(UsuarioInfo);  
  }  
  //Update Existing Usuario
  updateUsuarioInforamtion(Usuarioid, UsuarioInfo) {  
    delete UsuarioInfo.id;  
    this.angularFirestore.doc('Usuario/' + Usuarioid).update(UsuarioInfo);  
  }  
  
  //Delete Usuario
  deleteUsuario(id) {  
    this.angularFirestore.doc('Usuario/' + id).delete();  
  }  
}
