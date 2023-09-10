import { CartList } from "../cartlist.js";
//Unit Test for the Carlist and its corresponding functions
describe('Cartlist',()=>{
    let cartList;

    beforeEach(()=>{
        cartList = new CartList();
        console.log('\nStarting new test for Cart List')
    });

    it('should have an empty cartlist array when initialized', () => {
        expect(cartList.cartlist.length).toBe(0);
    });

    it('should add an item to the cartlist array if the id does not exist and the quantity is greater than zero', () => {
        const cartItem = { id: 1, quantity: 2 };
    
        const result = cartList.add(cartItem);
    
        expect(result).toBe(1);
        expect(cartList.cartlist).toEqual([cartItem]);
      });

    it('should not add an item to the cartlist array if the id already exists', () => {
        const cartItem1 = { id: 1, quantity: 2 };
        const cartItem2 = { id: 1, quantity: 3 };
        cartList.cartlist = [cartItem1];
        const result = cartList.add(cartItem2);
        expect(result).toBe(0);
        expect(cartList.cartlist).toEqual([cartItem1]);
      });

    it('should not add an item to the cartlist array if the quantity is zero', () => {
        const cartItem = { id: 1, quantity: 0 };
        const result = cartList.add(cartItem);
        expect(result).toBe(0);
        expect(cartList.cartlist).toEqual([]);
      });

    it('should update the quantity of an item in the cartlist array if the id exists and the quantity is greater than zero', () => {
        const cartItem1 = { id: 1, quantity: 2 };
        const cartItem2 = { id: 1, quantity: 3 };
        cartList.cartlist = [cartItem1];
    
        const result = cartList.update(cartItem2);
    
        expect(result).toBe(1);
        expect(cartList.cartlist).toEqual([cartItem2]);
      });

    it('should remove an item from the cartlist array if the id exists and the quantity is zero', () => {
        const cartItem = { id: 1, quantity: 0 };
        cartList.cartlist = [cartItem];
    
        const result = cartList.update(cartItem);
    
        expect(result).toBe(1);
        expect(cartList.cartlist).toEqual([]);
      });

    it('should clear the cartlist array', () => {
        cartList.cartlist = [{ id: 1, quantity: 2 }];
    
        cartList.clear();
    
        expect(cartList.cartlist).toEqual([]);
      });
    
    it('should return the cartlist array',()=>{
        const cartitem = { id: 1, quantity: 2 }
        cartList.cartlist = [cartitem];
        expect(cartList.display()).toEqual([cartitem]);
    })
})