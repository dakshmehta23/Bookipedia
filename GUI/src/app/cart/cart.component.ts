import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }

  cartproducts: any = [] /* initializing variables */
  quantity: any
  total: any = 0
  success: any
  failure: any
  length: any
  item: number


  ngOnInit(): void {
    this.api.getCartDetails().subscribe((data: any) => { //call the getcartdetails method using the api service
      this.cartproducts = data;
      this.total = this.getTotalPrice(data)
      this.length = this.cartproducts.length;
    })
  }


  getTotalPrice(cart: any) { //function to calculate the total of the items in cart
    let temptotal = 0;
    for (let item of cart) {
      temptotal += item.product.price * item.quantity;
    }
    return temptotal;
  }


  reduceQuantity(id: String, quantity: number) { //function to reduce the quantity of an item in cart
    if (quantity > 1) {
      quantity--;
      var itemIndex = this.cartproducts.findIndex((item: { product: any, quantity: number }) => item.product.id === id);
      this.cartproducts[itemIndex].quantity = quantity

      this.api.updateCartDetails(id, quantity.toString()).subscribe((data: any) => { //update cart details after reducing quantity

        if (data.success)
          this.success = true
        else
          this.failure = true
      })

      this.total = this.getTotalPrice(this.cartproducts)
      console.log(this.total)
      //this.length = this.cartproducts.length;
    }
  }

  increaseQuantity(id: String, quantity: number) { //function to increase the quantity of an item present in the cart 
    quantity++;
    var itemIndex = this.cartproducts.findIndex((item: { product: any, quantity: number }) => item.product.id === id);
    if (quantity <= this.cartproducts[itemIndex].product.stockcount) {
      this.api.updateCartDetails(id, quantity.toString()).subscribe((data: any) => { //update the cart with increased quantity and calculate the total
        this.total = this.getTotalPrice(this.cartproducts)
      })
      this.cartproducts[itemIndex].quantity = quantity
    }
  }

  deleteItem(id: String, quantity: number) { //function to remove an item from the cart 
    quantity = 0;
    var itemIndex = this.cartproducts.findIndex((item: { product: any, quantity: number }) => item.product.id === id);
    this.cartproducts[itemIndex].quantity = quantity

    this.api.setNumOfItems(this.length - 1);
    this.length--;
    this.api.updateCartDetails(id, quantity.toString()).subscribe((data: any) => {
      this.total = this.getTotalPrice(this.cartproducts)
      //this.length = this.cartproducts.length;
      //console.log(this.length)
    })



  }

}
