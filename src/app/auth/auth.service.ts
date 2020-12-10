import { Injectable } from '@angular/core';
import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import {AngularFirestore} from '@angular/fire/firestore';
import {Usuario} from '../user/usuario';
import {flatMap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  usuario: Usuario;
  constructor(public  afAuth:  AngularFireAuth, public  router:  Router,public db: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('usuario', JSON.stringify(this.usuario));
      } else {
        localStorage.setItem('user', null);
        localStorage.setItem('usuario', null);
      }
    })
   }
   
   async login(email: string, password: string) {
    try{
    let self = this;
    var result = await this.afAuth.signInWithEmailAndPassword(email, password).then((value) => {
      let uid = value.user.uid;
      console.log(uid);
      let usuario = self.db.collection<Usuario>('Usuario', ref =>
        ref.where('userId', '==', uid).limit(1)).valueChanges({idField:"id"}).pipe(
          flatMap(users=>users)
      );
      usuario.subscribe(queriedItems => {


      localStorage.setItem("usuario",JSON.stringify(queriedItems));



        console.log("*************************************localstorage******************************");
        console.log(localStorage.getItem("usuario"));
        var ls = JSON.parse(localStorage.getItem("usuario"));
        console.log(ls);
      });

      this.router.navigate(['products']);

    }); 
  }catch(error){
    console.error(error)
    alert("Login fallido verifique sus datos")
  }
}


 async register(email: string, password: string):Promise<User>{
   try{
    var result = await this.afAuth.createUserWithEmailAndPassword(email, password);
    console.log(result.user.uid);
    return result.user;
    
   }catch(error){
     console.error(error)
     alert("Verifique los datos ingresados")
   }


  
}
async sendPasswordResetEmail(passwordResetEmail: string) {
  return await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
}
async logout(){
  await this.afAuth.signOut();
  localStorage.removeItem('user');
  this.router.navigate(['signin']);
}

get isLoggedIn(): boolean {
  const  user  =  JSON.parse(localStorage.getItem('user'));
  return  user  !==  null;
}
async  loginWithGoogle(){
  await  this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
  this.router.navigate(['admin-products']);
}

}
