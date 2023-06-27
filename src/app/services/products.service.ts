import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  category:string="";
  productId:string="";
  updateCategory(category:string){
    this.category=category;
  }

  updateProductId(id:string){
    this.productId=id;
    console.log(this.productId);

  }




}
