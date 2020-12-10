import { Component, OnInit } from '@angular/core';
import { MetopService } from '../admin/add-metodo-pago/metop.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Metop } from '../admin/add-metodo-pago/metop';  

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  metops: Metop[];  
  Metop: Metop = new Metop();  
  constructor(private metopService: MetopService,  
    private angularFirestore: AngularFirestore  ) { }

  ngOnInit(): void {
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


}
