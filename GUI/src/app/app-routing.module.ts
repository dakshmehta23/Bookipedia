import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutpageComponent } from './checkoutpage/checkoutpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { ProductpageComponent } from './productpage/productpage.component';

const routes: Routes = [ { path: '',  pathMatch:'full',redirectTo:'/home' },
{ path: 'home',component: HomepageComponent },
{ path: 'product/:id',component: ProductpageComponent },
{ path: 'login',component: LoginpageComponent },
{ path: 'checkout',component: CheckoutpageComponent },
{ path: 'cart',component: CartComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
