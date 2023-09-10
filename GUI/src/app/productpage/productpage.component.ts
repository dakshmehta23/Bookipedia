import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Cart } from '../model/cart';


@Component({
  selector: 'app-productpage',
  templateUrl: './productpage.component.html',
  styleUrls: ['./productpage.component.css']
})
//Component to show Details of the Product
export class ProductpageComponent implements OnInit {
  
  constructor(private route:ActivatedRoute, private api:ApiService, private cart:Cart, ){}
  //variale to store product details got from API
  product:any
  //Variable to keep track of number of quantites getting added to cart
  quantity:any = 1
  success:boolean= false
  failure:boolean=false
  item:number=0

  //Method called to reduce number of quantites (Minimum 1 quantity allowed)
  reduceQuantity(){
    this.quantity--
    if (this.quantity < 1)
    this.quantity =1
  }

//Method called to increase number of quantites
  increaseQuantity(){
    this.quantity++
      if (this.quantity >this.product.stockcount)
    this.quantity =this.product.stockcount
  }

 //method to add a book in cart. Called on "Add to cart" button press
  addToCart(){
    //console.log("adding to cart!")
    this.api.postCartDetails(this.product.id,this.quantity).subscribe((data:any)=>{
      //console.log(data)
      if(data.success){
      this.success = true
      this.api.numOfItems$.subscribe(numOfItems => {
        this.item = numOfItems;
        console.log(numOfItems); 
      });
      
    this.api.setNumOfItems(this.item+1);
      }
      else
      this.failure=true
    })
  }
  //Method called at initially to get Product details
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.api.getProductById(id).subscribe((data:any)=>{
      this.product=data
    })
  }

}
