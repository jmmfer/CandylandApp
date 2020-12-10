import { Component, OnInit } from '@angular/core';
import { Metor } from '../add-metodo-retiro/metor';  
import { MetorService } from '../add-metodo-retiro/metor.service';  
import { AngularFirestore } from '@angular/fire/firestore'; 


@Component({
  selector: 'app-add-metodo-retiro',
  templateUrl: './add-metodo-retiro.component.html',
  styleUrls: ['./add-metodo-retiro.component.css']
})
export class AddMetodoRetiroComponent {

  updateMetor: boolean = false;  
  metors: Metor[];  
  Metor: Metor = new Metor();  
  
  metorId = null;  
  isToggle: boolean = false;  
  formSubmitted: boolean;  
  isDelete: boolean;  
  
  constructor(private metorService: MetorService,  
    private angularFirestore: AngularFirestore  
  ) {  
    this.getAllMetor();  
  }  
  
  getAllMetor() {  
    this.metorService.getAllMetor().subscribe((data: any) => {  
      this.metors = data.map(e => {  
        return {  
          id: e.payload.doc.id,  
          ...e.payload.doc.data()  
        } as Metor;  
      });  
      console.log(this.metors);  
  
    });  
  }  
  
  onSubmit(f) {  
    if (f.form.valid) {  
      const MetorData = JSON.parse(JSON.stringify(this.Metor));  
      debugger;  
      if (this.metorId == null) {  
        this.metorService.addMetorInforamtion(MetorData);  
      } else {  
        this.metorService.updateMetorInforamtion(this.metorId, MetorData);  
      }  
      this.Metor = new Metor();  
      f.submitted = false;  
      this.formSubmitted = true;  
      this.updateMetor = false;  
      setInterval(() => {  
        this.formSubmitted = false;  
  
      }, 2000);  
    }  
  }  
  
  //Edit Metor method  
  editMetor(metorId) {  
    this.metorId = metorId;  
    let obj: any = this.metors.filter((x: any) => {  
      return x.id == metorId;  
    });  
    this.updateMetor = true;  
    this.Metor= obj[0];  
  }  
  
  // Delete Metor method  
  deleteMetor(metorId) {  
    if (confirm('Please note! This action can NOT be undone. Are you sure you want to delete?')) {  
  
      this.metorService.deleteMetor(metorId);  
      this.isDelete = true;  
      setInterval(() => {  
        this.isDelete = false;  
      }, 2000);  
    }  
  }  
  
}  