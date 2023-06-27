import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  wishListItems:any=[];
  itemsPresent=false;
  constructor(private apiService:ApiService,private prodService:ProductsService,private route:Router,private cartService:CartService) { }

  ngOnInit(): void {
    var currentUser = localStorage.getItem("userId");
    var userId = (currentUser==null)?0:parseInt(currentUser);
    this.apiService.getActiveWishListItems(userId).subscribe((data:any)=>{
      this.wishListItems = data;
      if(data.length>0){
        this.itemsPresent=true;
      }
      else{
        this.itemsPresent=false;
      }

    })
  }

  rate(_price:any,_discount:any){
    let price = parseInt(_price.replaceAll(",",""));
    let discount=parseInt(_discount);
    let x= (price*discount)/100;
    let final = price-x;
    return final;
  }

  addToCart(product:any){
    var currentUser = localStorage.getItem("userId");
    var userId = (currentUser==null)?0:parseInt(currentUser);
    this.apiService.insertCartItem(userId,product).subscribe(data=>{
      if(data==true){
        alert("Product Added");
        this.cartService.getCartItemsLength();
        this.remove(product.prodId);
      }
      else{
        alert("Cannot Add Product");
      }
    });
  }

  remove(prodId:string){
    var currentUser = localStorage.getItem("userId");
    var userId = (currentUser==null)?0:parseInt(currentUser);
    this.apiService.removeWishListItem(userId,prodId).subscribe((data:any)=>{
      if(data){
        this.ngOnInit();
        this.cartService.getWishListItemsLength();
      }
    })
  }
}
