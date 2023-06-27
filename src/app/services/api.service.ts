import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsService } from './products.service';
import { UserDetails } from '../models/userDetails.model';
import { Login } from '../models/login.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService{

  constructor(private http:HttpClient, private prodService:ProductsService){}

  apiUrl:string = "https://localhost:7167/NewChoiceStoreApi/";

  getProductsByCategory(category:string){
    return this.http.get(this.apiUrl+"Products/Category/"+category);
  }

  getProductById(){
    return this.http.get(this.apiUrl+"Products/"+this.prodService.productId);
  }

  getRelatedProducts(){
    return this.http.get(this.apiUrl+"Products/RelatedProducts/"+this.prodService.category+"/"+this.prodService.productId);
  }

  createUser(userDetails:UserDetails){
    return this.http.post(this.apiUrl+"SignUp",userDetails);
  }

  login(loginDetails:Login){
    return this.http.post(this.apiUrl+"Logins",loginDetails);
  }

  getActiveCartId(userId:number){
    return this.http.get(this.apiUrl+"Carts/getActiveCartId/"+userId);
  }

  insertCartItem(userId:number,product:Product){
    console.log(product);
    return this.http.post(this.apiUrl+"Carts/"+userId,product);
  }

  getActiveCartItems(userId:number){
    return this.http.get(this.apiUrl+"Carts/getCartItems/"+userId);
  }

  deleteCartItem(userId:number,prodId:string){
    return this.http.delete(this.apiUrl+"Carts/user/"+userId+"/"+prodId);
  }

  placeOrder(cartId:number,amtPaid:string,paymentType:string,userId:number){
    return this.http.post(this.apiUrl+"Orders/"+cartId+"/"+amtPaid+"/"+paymentType,userId);
  }

  getPreviousOrders(userId:number){
    return this.http.get(this.apiUrl+"Orders/"+userId);
  }

  insertWishListItem(userId:number,product:Product){
    return this.http.post(this.apiUrl+"WishLists/"+userId,product);
  }

  getActiveWishListItems(userId:number){
    return this.http.get(this.apiUrl+"WishLists/"+userId);
  }

  removeWishListItem(userId:number,prodId:string){
    return this.http.delete(this.apiUrl+"WishLists/"+userId+"/"+prodId);
  }

  getUserDetails(userId:number){
    return this.http.get(this.apiUrl+"SignUp/"+userId);
  }

  updateUserDetails(userDetails:UserDetails,userId:number){
    return this.http.put(this.apiUrl+"SignUp/"+userId,userDetails);
  }
}
