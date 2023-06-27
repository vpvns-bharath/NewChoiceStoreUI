import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesProductsComponent } from './components/categories-products/categories-products.component';
import { HomeComponent } from './components/home/home.component';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './shared/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

const routes: Routes = [

  {
    path:"",
    redirectTo:"/login",
    pathMatch:"full"
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"home",
    component:HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"categories/mobiles",
    component:CategoriesProductsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"categories/men'sFashion",
    component:CategoriesProductsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"categories/women'sFashion",
    component:CategoriesProductsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"categories/footwear",
    component:CategoriesProductsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"categories/laptops",
    component:CategoriesProductsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"product-details",
    component:ViewProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"cart",
    component:CartComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"wishList",
    component:WishListComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"my-orders",
    component:MyOrdersComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"profile",
    component:MyProfileComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
