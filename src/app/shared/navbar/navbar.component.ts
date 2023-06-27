import { Component, OnInit} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userName:string="User";

  constructor(private service:ProductsService,private apiService:ApiService,public cartService:CartService) {
    this.cartService.getCartItemsLength();
    this.cartService.getWishListItemsLength();
  }

  ngOnInit(): void {
    var currentUser = localStorage.getItem("userId");
    var userId = (currentUser==null)?0:parseInt(currentUser);
    this.apiService.getUserDetails(userId).subscribe((data:any)=>{
      if(data.displayName!=''){
        this.userName=data.displayName;
      }
    })
  }


  updateCategory(category:string){
    this.service.updateCategory(category);
  }

  signOut(){
    localStorage.clear();
  }

}
