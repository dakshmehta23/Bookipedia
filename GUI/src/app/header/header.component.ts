import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private api: ApiService) {
    length= 0;
   }
   cartproducts: any = []
 length: any;

   //Method called when header is initialized
  ngOnInit(): void {
    this.api.getCartDetails().subscribe((data: any) => {
      this.cartproducts = data;
      this.length = this.cartproducts.length;
    })
    this.api.numOfItems$.subscribe(numOfItems => {
      this.length = numOfItems;
     // console.log(this.api.getNumOfItems())
      
    });
  }
  

}
