// Cart Class is used to instantiate data which will be stored in the cart list on the server.
// It contains the product id and quantity of the product a user intends to buy
export class Cart{
    constructor(id,quantity){
        this.id = id;
        this.quantity = quantity;
    }
}