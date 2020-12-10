import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: Observable<any[]>;
  constructor(db: AngularFirestore){ 
    this.items = db.collection('items').valueChanges();
  }

  ngOnInit(): void {
  }

}
