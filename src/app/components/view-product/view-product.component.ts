import {Component,OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit{

  product:any;
  relatedProducts:any=[];
  loading=true;
  constructor(private service:ApiService,private prodService:ProductsService,private cartService:CartService) {

  }

  ngOnInit(): void {
    this.loadData();
  }


  loadData(){
    this.service.getProductById().subscribe(data=>{
      setTimeout(()=>{
        this.product = data;
        this.service.getRelatedProducts().subscribe(relatedProds=>{
          this.relatedProducts=[];
          this.relatedProducts.push(relatedProds);
        });
        this.loading=false;
      },2000)
     })

     console.log(this.relatedProducts);
  }


  rate(_price:any,_discount:any){
    let price = parseInt(_price.replaceAll(",",""));
    let discount=parseInt(_discount);
    let x= (price*discount)/100;
    let final = price-x;
    return final;
  }

  getStarRating(rating:string){
    let _rating = parseInt(rating);
    _rating=Math.round(_rating*2)/2;

    let code=[];
    // Append all the filled whole stars
    for (var i = _rating; i >= 1; i--){
    code.push(` bi bi-star-fill me-1`);
    }

    // If there is a half a star, append it
    if (i == .5){
    code.push(`bi bi-star-half me-1`);
    }

    // Fill the empty stars
    for (let i = (5 - _rating); i >= 1; i--){
      code.push(`bi bi-star me-1`);
    }

    return code;
  }


  viewProduct(id:string){
    this.prodService.updateProductId(id);
    this.loading=true;
    this.loadData();
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
