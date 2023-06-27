import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CategoriesProductsComponent } from './components/categories-products/categories-products.component';
import { ProductsService } from './services/products.service';
import { ViewProductComponent } from './components/view-product/view-product.component';
import { LoadingPageComponent } from './shared/loading-page/loading-page.component';
import { ApiService } from './services/api.service';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CartService } from './services/cart.service';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    CategoriesProductsComponent,
    ViewProductComponent,
    LoadingPageComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    MyOrdersComponent,
    WishListComponent,
    MyProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgHttpLoaderModule.forRoot()
  ],
  providers: [ProductsService,ApiService,CartService,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
