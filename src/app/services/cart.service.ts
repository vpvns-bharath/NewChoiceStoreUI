import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private apiService:ApiService) { }

  cartLength=0;
  wishListItemsLength=0;
  currentUser = localStorage.getItem("userId");
  userId = (this.currentUser==null)?0:parseInt(this.currentUser);
  getCartItemsLength(){

    this.apiService.getActiveCartItems(this.userId).subscribe((data:any)=>{
        this.cartLength= data.length;
    })
  }

  getWishListItemsLength(){
    this.apiService.getActiveWishListItems(this.userId).subscribe((data:any)=>{
      this.wishListItemsLength= data.length;
    })
  }

}
