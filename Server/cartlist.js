//Class Cart list is used to store the Product data after a user adds an item to the cart
export class CartList{
    constructor(){
        //Instantiate an empty list when the server has started
        this.cartlist = []; 
    }
    // Check if the product id exists in the cart list
    idexists(id) {
        return !this.cartlist.find(a => a.id == id);
    }
    // Adding a new item to the list, If the product id doesnt exist in the cart
    add(cartitem)
    {
        if(this.idexists(cartitem.id) && cartitem.quantity > 0)
        {
          this.cartlist.push(cartitem);
          return 1;
        }
        return 0;    
    }
    // Update an existing item from the list, If the product id exists in the cart
    update(cartitem){
        var result = this.cartlist.findIndex(a => a.id == cartitem.id);
        // If the item exist and the quantity is greater then zero then update the quantity of the item
        if(result > -1 && cartitem.quantity>0)
        {
            this.cartlist[result].quantity = cartitem.quantity;
            return 1;
        }
        // If the item exist and the quantity is zero then delete the item from the cart
        else if(result> -1 && cartitem.quantity == 0){
            this.cartlist.splice(result,1);
            return 1;   
        }
        else return 0;
    }
    // Clear the Cart list
    clear()
    {
        this.cartlist = [];
    }
    // Return the Cart list
    display()
    {
        return this.cartlist;
    }
}