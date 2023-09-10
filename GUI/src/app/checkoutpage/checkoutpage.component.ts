import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-checkoutpage',
  templateUrl: './checkoutpage.component.html',
  styleUrls: ['./checkoutpage.component.css']
})
export class CheckoutpageComponent implements OnInit {
  requiredForm: FormGroup;
  constructor(public router: Router, private api: ApiService, private fb: FormBuilder) {
    this.checkoutForm();
  }

  cartitems: any //initialize variables
  total: any
  shipping: any

  checkoutForm() {
    const addressdetails = this.fb.group({
      street: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]], //defining accepted inputs in the form
      city: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]],
      house: ['', [Validators.maxLength(10)]],
      postal: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]]
    })
    const creditcarddetails = this.fb.group({
      ccname: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]],
      number: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern("^[0-9]*$")]],
      expirydate: ['', [Validators.required, Validators.pattern("^(0[1-9]|1[0-2])\/?([1-9][1-9])$")]],
      zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(6), Validators.pattern("^[0-9]*$")]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern("^[0-9]*$")]]
    })

    this.requiredForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*')]],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]*$")]],
      address: addressdetails,
      creditcard: creditcarddetails
    })
  }

  ngOnInit(): void {
    this.api.getCartDetails().subscribe((data: any) => { // get the cart details 
      this.cartitems = data;
      this.total = this.getTotalPrice(data)
      this.shipping = this.cartitems.length * 3.5;
    })
  }

  SubmitHandler() { //function to submit the form
    const formValue = this.requiredForm.value;
    this.api.postUserDetails(formValue).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        window.alert("Items have been purchased Successfully");
        this.router.navigate([])
      }
      else {
        window.alert("Items could not be pruchased please check the details");
      }
    })
  }

  getTotalPrice(cart: any) { //calculate total price of items in cart
    let temptotal = 0;
    if (cart.length > 0) {
      for (let item of cart) {
        temptotal += item.product.price * item.quantity;
      }
    }
    return temptotal;
  }

  get name() { //getters 
    return this.requiredForm.get('name');
  }
  get email() {
    return this.requiredForm.get('email');
  }
  get phone() {
    return this.requiredForm.get('phone');
  }
  get street() {
    return this.requiredForm.get('address.street');
  }
  get city() {
    return this.requiredForm.get('address.city');
  }
  get house() {
    return this.requiredForm.get('address.house');
  }
  get zip() {
    return this.requiredForm.get('address.postal');
  }
  get ccname() {
    return this.requiredForm.get('creditcard.ccname');
  }
  get ccnumber() {
    return this.requiredForm.get('creditcard.number');
  }
  get ccdate() {
    return this.requiredForm.get('creditcard.expirydate');
  }
  get cczip() {
    return this.requiredForm.get('creditcard.zip');
  }
  get cccvv() {
    return this.requiredForm.get('creditcard.cvv');
  }
}
