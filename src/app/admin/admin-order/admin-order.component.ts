import { Component, OnInit } from '@angular/core';
import { Order } from '../../order';  
import { OrderService } from '../../order.service';  
import { AngularFirestore } from '@angular/fire/firestore';  
import { MetopService } from '../add-metodo-pago/metop.service';  
import { Metop } from '../add-metodo-pago/metop';  
import { MetorService } from '../add-metodo-retiro/metor.service';  
import { Metor } from '../add-metodo-retiro/metor';



@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent {
  updateOrder: boolean = false;  
  orders: Order[];  
  Order: Order = new Order();  
  
  orderId = null;  
  isToggle: boolean = false;  
  formSubmitted: boolean;  
  isDelete: boolean;  

  metors: Metor[];
  metops: Metop[];
  
  constructor(private OrderService: OrderService,  
    private angularFirestore: AngularFirestore,
    private metopService: MetopService,  
    private metorService: MetorService
  ) {  
    this.getAllOrder();  
    this.getAllMetop();
    this.getAllMetor();
  }  
  
  getAllOrder() {  
    this.OrderService.getAllOrder().subscribe((data: any) => {  
      this.orders = data.map(e => {  
        return {  
          id: e.payload.doc.id,  
          ...e.payload.doc.data()  
        } as Order;  
      });  
      console.log(this.orders);  
  
    });  
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
      const OrderData = JSON.parse(JSON.stringify(this.Order));  
      debugger;  
      if (this.orderId == null) {  
        this.OrderService.addOrderInforamtion(OrderData);  
      } else {  
        this.OrderService.updateOrderInforamtion(this.orderId, OrderData);  
      }  
      this.Order= new Order();  
      f.submitted = false;  
      this.formSubmitted = true;  
      this.updateOrder = false;  
      setInterval(() => {  
        this.formSubmitted = false;  
  
      }, 2000);  
    }  
  }  
  
  //Edit Order method  
  editOrder(orderId) {  
    this.orderId = orderId;  
    let obj: any = this.orders.filter((x: any) => {  
      return x.id == orderId;  
    });  
    this.updateOrder= true;  
    this.Order= obj[0];  
  }  
  
  // Delete Order method  
  deleteOrder(orderId) {  
    if (confirm('Please note! This action can NOT be undone. Are you sure you want to delete?')) {  
  
      this.OrderService.deleteOrder(orderId);  
      this.isDelete = true;  
      setInterval(() => {  
        this.isDelete = false;  
      }, 2000);  
    }  
  }  
  
}  