import { Component, OnInit } from '@angular/core';
import { Metop } from '../add-metodo-pago/metop';  
import { MetopService } from '../add-metodo-pago/metop.service';  
import { AngularFirestore } from '@angular/fire/firestore'; 

@Component({
  selector: 'app-add-metodo-pago',
  templateUrl: './add-metodo-pago.component.html',
  styleUrls: ['./add-metodo-pago.component.css']
})
export class AddMetodoPagoComponent {  
  updateMetop: boolean = false;  
  metops: Metop[];  
  Metop: Metop = new Metop();  
  
  metopId = null;  
  isToggle: boolean = false;  
  formSubmitted: boolean;  
  isDelete: boolean;  
  
  constructor(private metopService: MetopService,  
    private angularFirestore: AngularFirestore  
  ) {  
    this.getAllMetop();  
  }  
  
  getAllMetop() {  
    this.metopService.getAllMetop().subscribe((data: any) => {  
      this.metops = data.map(e => {  
        return {  
          id: e.payload.doc.id,  
          ...e.payload.doc.data()  
        } as Metop;  
      });  
      console.log(this.metops);  
  
    });  
  }  
  
  onSubmit(f) {  
    if (f.form.valid) {  
      const MetopData = JSON.parse(JSON.stringify(this.Metop));  
      debugger;  
      if (this.metopId == null) {  
        this.metopService.addMetopInforamtion(MetopData);  
      } else {  
        this.metopService.updateMetopInforamtion(this.metopId, MetopData);  
      }  
      this.Metop = new Metop();  
      f.submitted = false;  
      this.formSubmitted = true;  
      this.updateMetop = false;  
      setInterval(() => {  
        this.formSubmitted = false;  
  
      }, 2000);  
    }  
  }  
  
  //Edit Category method  
  editMetop(metopId) {  
    this.metopId = metopId;  
    let obj: any = this.metops.filter((x: any) => {  
      return x.id == metopId;  
    });  
    this.updateMetop= true;  
    this.Metop = obj[0];  
  }  
  
  // Delete Category method  
  deleteMetop(metopId) {  
    if (confirm('Please note! This action can NOT be undone. Are you sure you want to delete?')) {  
  
      this.metopService.deleteMetop(metopId);  
      this.isDelete = true;  
      setInterval(() => {  
        this.isDelete = false;  
      }, 2000);  
    }  
  }  
  
}  