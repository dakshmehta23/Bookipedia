import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cart } from './model/cart';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private route: Router, private cartRequest: Cart) { }

  private base_url = "http://localhost:3000"
  private numOfItemsSubject = new BehaviorSubject<number>(0);
  numOfItems$ = this.numOfItemsSubject.asObservable();

  setNumOfItems(numOfItems: number) {
    this.numOfItemsSubject.next(numOfItems);
  }
  
  getNumOfItems(): number {
    return this.numOfItemsSubject.getValue();
  }

  
  public getProductList() {
    return this.http.get(this.base_url);
  }

  public getProductById(id: any) {
    return this.http.get(this.base_url + "/product/" + id);
  }

  postCartDetails(id: String, quantity: String) {
    this.cartRequest.setId(id);
    this.cartRequest.setQuantity(quantity);
    console.log(JSON.stringify(this.cartRequest))
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(this.base_url + "/cart", JSON.stringify(this.cartRequest), { headers: headers })
  }
  postUserDetails(formvalue:any){
    
    let headers = new HttpHeaders().set('Content-Type','application/json')
    return this.http.post(this.base_url+"/checkout", JSON.stringify(formvalue),{headers:headers})
  }

  public getCartDetails() {
    return this.http.get(this.base_url + "/cart");
  }

  updateCartDetails(id: String, quantity: String) {
    this.cartRequest.setId(id);
    this.cartRequest.setQuantity(quantity);
    // console.log(JSON.stringify(this.cartRequest))
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.put(this.base_url + "/cart", JSON.stringify(this.cartRequest), { headers: headers })
  }

}
