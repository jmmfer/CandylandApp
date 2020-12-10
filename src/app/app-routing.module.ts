import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { HomeComponent } from './home/home.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { PickupComponent } from './pickup/pickup.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { PagoComponent } from './pago/pago.component';

import { AddCategoryComponent } from './admin/add-category/add-category.component'
import { AddMetodoPagoComponent } from './admin/add-metodo-pago/add-metodo-pago.component';
import { AddMetodoRetiroComponent } from './admin/add-metodo-retiro/add-metodo-retiro.component';
import { ForgotPasswordComponent } from  './user/forgot-password/forgot-password.component';
import { ProfileComponent } from  './profile/profile.component'
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { WishlistComponent } from './wishlist/wishlist.component';





const routes: Routes = [
  
  { path: '', component: HomeComponent},
  { path: 'users', component: UserComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'cart', component: CartComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'admin-products', component: AdminProductsComponent },
  { path: 'user', component: AdminUsersComponent },
  { path: 'admin-category', component: AddCategoryComponent },
  { path: 'admin-metodo-pago', component: AddMetodoPagoComponent },
  { path: 'admin-metodo-retiro', component: AddMetodoRetiroComponent },
  { path:  'forgot-password', component:  ForgotPasswordComponent },
  { path: 'admin-products', component: AdminProductsComponent},
  { path: 'users', component: AdminUsersComponent},
  { path: 'delivery', component: DeliveryComponent},
  { path: 'pickup', component: PickupComponent},
  { path: 'thankyou', component: ThankyouComponent},
  { path: 'pago', component: PagoComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'admin-orders', component: AdminOrderComponent},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'wishlist', component: WishlistComponent}

  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
