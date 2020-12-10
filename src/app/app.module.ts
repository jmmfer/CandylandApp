import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from '@angular/fire/database';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { ProductsComponent } from './products/products.component';
import { ServicesComponent } from './products/services/services.component';
import { CartComponent } from './products/cart/cart.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { AddMetodoPagoComponent } from './admin/add-metodo-pago/add-metodo-pago.component';
import { AddMetodoRetiroComponent } from './admin/add-metodo-retiro/add-metodo-retiro.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { PickupComponent } from './pickup/pickup.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { PagoComponent } from './pago/pago.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { WishlistComponent } from './wishlist/wishlist.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminProductsComponent,
    AdminUsersComponent,
    ProductsComponent,
    ServicesComponent,
    CartComponent,
    UserComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    AddCategoryComponent,
    AddMetodoPagoComponent,
    AddMetodoRetiroComponent,
    ForgotPasswordComponent,
    DeliveryComponent,
    PickupComponent,
    ThankyouComponent,
    PagoComponent,
    ProfileComponent,
    AdminOrderComponent,
    AboutUsComponent,
    WishlistComponent
  ],
  imports: [
   
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, "cloud"),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    FormsModule,
    AngularFireStorageModule,
    FormsModule, ReactiveFormsModule



   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
