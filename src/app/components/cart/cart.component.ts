import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts:any = [];
  cartTotal:number=0;
  totalPrice:number=0;
  discountAmount:number=0;
  shippingCharge:number=0;
  amountPayable:number=0;

  constructor(private apiService:ApiService,private cartService:CartService ) { }

  itemsPresent:boolean = false;
  PaymentOption:any;
  enableOrderNow:boolean = true;

  ngOnInit(): void {
    var currentUser = localStorage.getItem("userId");
    var userId = (currentUser==null)?0:parseInt(currentUser);
    this.apiService.getActiveCartItems(userId).subscribe((data:any)=>{
        this.cartProducts=data;
        if(data.length>0){
          this.itemsPresent=true;
        }else{
          this.itemsPresent=false;
        }
    })

    setTimeout(()=>{
      this.cartTotal=this.cartProducts.length;
      this.totalPrice = this.calculateTotalPrice();
      this.discountAmount = this.calculateTotalDiscount();
      this.shippingCharge = this.getShippingCharge();
      this.amountPayable = this.totalPrice  + this.shippingCharge;
    },1000);

  }

  ngDoCheck(){
    if(this.PaymentOption!=undefined){
      this.enableOrderNow=false;
    }
  }

  rate(_price:any,_discount:any){
    let price = parseInt(_price.replaceAll(",",""));
    let discount=parseInt(_discount);
    let x= (price*discount)/100;
    let final = price-x;
    return final;
  }

  deleteCartItem(prodId:string){
    var currentUser = localStorage.getItem("userId");
    var userId = (currentUser==null)?0:parseInt(currentUser);
    this.apiService.deleteCartItem(userId,prodId).subscribe((data)=>{
      if(data){
        this.ngOnInit();
        this.cartService.getCartItemsLength();
      }
    });
  }

  calculateTotalPrice(){
    let price=0;
    this.cartProducts.forEach((ele:any) => {
      price=price+this.rate(ele.price,ele.discount);
    });
    return price;
  }

  calculateTotalDiscount(){
    let discount=0;
    this.cartProducts.forEach((ele:any) => {
      discount=discount+((parseInt(ele.discount)*parseInt(ele.price.replaceAll(",","")))/100);
    });
    return discount;
  }

  getShippingCharge(){
    if(this.cartTotal<=3){
      return 200;
    }
    else if(this.cartTotal>3 && this.cartTotal<=5){
      return 500;
    }
    return 1000;
  }

  placeOrder(){
    var currentUser = localStorage.getItem("userId");
    var userId = (currentUser==null)?0:parseInt(currentUser);

    this.apiService.getActiveCartId(userId).subscribe((data:any)=>{
      this.apiService.placeOrder(data,this.amountPayable.toString(),this.PaymentOption,userId).subscribe(dt=>{
        if(dt){
          alert("Order Placed");
          this.cartService.getCartItemsLength();
          this.ngOnInit();
        }
      })
    });


  }

}
