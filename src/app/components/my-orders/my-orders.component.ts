import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  constructor(private apiService:ApiService) { }

  orders:any=[];
  itemsPresent:boolean=false;

  ngOnInit(): void {
    var currentUser = localStorage.getItem("userId");
    var userId = (currentUser==null)?0:parseInt(currentUser);
    this.apiService.getPreviousOrders(userId).subscribe((data:any)=>{
      console.log(data);
      this.orders=data;
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

}
