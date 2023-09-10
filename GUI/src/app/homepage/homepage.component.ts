import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
//Component to show list of all the books available to buy. 
//Filtering the books according to the types are also implemented in this component
export class HomepageComponent implements OnInit {
  
   constructor(private router:Router, private api:ApiService){}

   //Variable to store list of books coming through API
  books:any
  //Dummy Variable to store list of books to be shown when filtered
  filteredBooks:any=[]
  isFiltered:boolean= false
  filteringTags:any=[]
  //Tags to check if the filter checkboxes are clicked or unclicked
  checkboxValues = {
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false,
    checkbox6: false,
    checkbox7: false,
    checkbox8: false,
    checkbox9: false,
    checkbox10: false,
    checkbox11: false,
    checkbox12: false
  };

  //Routing to the product page on click over any product
viewProduct(id:any){
this.router.navigate(['product', id])
}

//Filtering the books according to filters chosen
filterBooks(e:any, tag:any) {
    this.filteredBooks=[]
    if(e.target.checked){    
        
        this.filteringTags.push(tag)
        this.books.forEach((book:any) =>{
            let tags = book.tags.split("@")
            
            for (let obj in tags){
                let done
               for(let obj1 in this.filteringTags){
                if(this.filteringTags[obj1].toLowerCase()===tags[obj].toLowerCase()){
                    //console.log("Inside if method")   
                   this.filteredBooks.push(book)
                   done =true
                   break;
                   }
               }
               if(done)
               break
               
            }
            //console.log(this.filteredBooks)
            this.isFiltered=true
            
        })
    }
    else
    {
        this.filteringTags.forEach( (item:any, index:any) => {
            if(item.toLowerCase() == tag.toLowerCase()) this.filteringTags.splice(index,1);
          });
          console.log(this.filteringTags)
          if(this.filteringTags.length == 0)
          this.isFiltered=false
          else{
            
            this.books.forEach((book:any) =>{
                let tags = book.tags.split("@")
                
                for (let obj in tags){
                    let done
                   for(let obj1 in this.filteringTags){
                    if(this.filteringTags[obj1].toLowerCase()===tags[obj].toLowerCase()){
                        //console.log("Inside if method")   
                       this.filteredBooks.push(book)
                       done=true
                       break;
                       }
                   }
                   if(done)
               break
                   
                }
               // console.log(this.filteredBooks)
                this.isFiltered=true
                
            })
          }
    }
 }
 //This method resets all the filters which are being applied in the search
 resetFilter(){
    //console.log("inside resetFilter")
    //window.location.reload()
    this.checkboxValues = {
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
        checkbox6: false,
        checkbox7: false,
        checkbox8: false,
        checkbox9: false,
        checkbox10: false,
        checkbox11: false,
        checkbox12: false
      };
    this.isFiltered = false;
    this.filteredBooks=[];
    this.filteringTags=[]
 }
 //Method called on initialization to populate book data
  ngOnInit(): void {
   this.api.getProductList().subscribe((data:any)=>{
    this.books=data;
   })
  }
}
