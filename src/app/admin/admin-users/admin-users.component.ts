import { Component, OnInit } from '@angular/core';
import { AuthService } from  '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Usuario} from "../../user/usuario";
import {UsuarioService} from "../../user/usuario.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

 
  usuario: Usuario = new Usuario();
  form: FormGroup;
  updateUsuario: boolean = false;  
  usuarios: Usuario[];  
  
  
 

  constructor(private  authService:  AuthService,   
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService, public  router:  Router,
    
  

    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      fullName: ['', Validators.required],
      phone: ['', Validators.required],
      
  });
}

get f() { return this.form.controls; }

 
  signup() {


    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    this.authService.register(this.f.email.value, this.f.password.value).then((value) => {
      console.log(value);
      console.log(value.uid);
      this.usuario.userId= value.uid;
      this.usuario.email = value.email;
     
      this.create(this.usuario);

    });
  
  };

  create(usuario) {
    const UsuarioData = JSON.parse(JSON.stringify(usuario));
    UsuarioData.isAdmin = true; 
    this.usuarioService.addUsuarioInforamtion(UsuarioData);
    this.router.navigate(['admin-products']);
    alert("Administrador creado exitosamente")
   
   
    
  }

}
