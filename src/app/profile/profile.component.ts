import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs';
import { Usuario } from '../user/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

import { UsuarioService } from '../user/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  Usuario: Observable<any[]>;
  emailToShow: string;
  nameToShow: string;
  phoneToShow: number;


 

  
  constructor(db: AngularFirestore) {
    this.Usuario = db.collection('Usuario').valueChanges(); }

  ngOnInit(): void {
    this.dataLoad()
    
  }

  
  dataLoad() {
    let v = (localStorage.getItem('usuario'));
    console.log(v)
    let o = JSON.parse(v)
    console.log(o)
    this.emailToShow = o.email
    this.nameToShow = o.fullName
    this.phoneToShow = o.phone

    

        
}
 


 
  
  
 

}
