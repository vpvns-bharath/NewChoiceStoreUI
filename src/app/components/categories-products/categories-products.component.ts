import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories-products',
  templateUrl: './categories-products.component.html',
  styleUrls: ['./categories-products.component.scss']
})
export class CategoriesProductsComponent implements OnInit {
  Products:any=[];
  category:string="";
  loading = true;

  constructor(private service:ApiService,private prodService:ProductsService,private route:Router,private cartService:CartService) {}

  ngOnInit(): void {
    this.category=this.prodService.category;

    this.service.getProductsByCategory(this.category).subscribe(data=>{
      setTimeout(()=>{
        this.Products=data;
        this.loading=false;
      },2000);
    })
  }

  rate(_price:any,_discount:any){
    let price = parseInt(_price.replaceAll(",",""));
    let discount=parseInt(_discount);
    let x= (price*discount)/100;
    let final = price-x;
    return final;
  }

  viewProduct(id:string){
    this.prodService.updateProductId(id);
    this.route.navigate(["/","product-details"]);
  }

  addToCart(product:Product){
    var currentUser = localStorage.getItem("userId");
    var userId = (currentUser==null)?0:parseInt(currentUser);
    this.service.insertCartItem(userId,product).subscribe(data=>{
      if(data==true){
        alert("Product Added");
        this.cartService.getCartItemsLength();
      }
      else{
        alert("Cannot Add Product");
      }
    });
  }

  addToWishList(product:Product){
    var currentUser = localStorage.getItem("userId");
    var userId = (currentUser==null)?0:parseInt(currentUser);
    this.service.insertWishListItem(userId,product).subscribe((data:any)=>{
      if(data){
        alert("Element Added To WishList");
        this.cartService.getWishListItemsLength();
      }
    })
  }

}
