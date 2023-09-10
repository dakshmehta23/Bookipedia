import request from 'request';

import { listenServer, closeServer } from '../server.js'
import productlist, { updateproductlist } from '../productlist.js'
import { CartList } from '../cartlist.js';
import { Userslist } from '../userslist.js';

//Unit Test for the Server and its corresponding functions

const products = productlist;
var cartlist = new CartList();
var usesrslist = new Userslist();
var base_url = "http://localhost:3002/"

describe('Ecommerce App',()=>{
    let ecommserver
    beforeEach(()=>{ 
        console.log('\nStarting new test for Server') 
        ecommserver = listenServer(3002);
    });
    afterEach(()=>{
        closeServer(ecommserver);
        console.log("Server Closed")
    });

    it('should return all products when a GET request is made to the root URL', (done) => {
        request.get(base_url, (error, response, body) => {
          expect(response.statusCode).toBe(200);
          expect(JSON.parse(body)).toEqual(products);
          done();
        });
      });
    
    it('should return a product with the given ID when a GET request is made to /product/:id', (done) => {
        const productId = products[0].id;
        request.get(base_url+'product/'+productId, (error, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(JSON.parse(body)).toEqual(products[0]);
            done();
          });
        });

    it('should return a 404 error when a GET request is made to /product/:id with an invalid ID', (done) => {
        const invalidId = 'invalid-id';
        request.get(base_url+'product/'+invalidId, (error, response, body) => {
              expect(response.statusCode).toBe(404);
              expect(body).toEqual("Product not found");
              done();
            });
        });
  
    it('should return the list of products in the cart when a GET request is made to /cart', (done) => {
            request.get(base_url+'cart', (error, response, body) => {
                  expect(response.statusCode).toBe(200);
                  console.log(body)
                  expect(JSON.parse(body)).toEqual({"Failure":"Cart is empty"});
                  done();
                });
            });
    
    it('should add a product to the cart when a POST request is made to /cart', (done) => {
        const cartItem = { id: products[0].id, quantity: 1 };
        request.post({
              url: base_url+'cart',
              body: cartItem,
              json: true
            }, (error, response, body) => {
              expect(response.statusCode).toBe(200);
              expect(body).toEqual({ "success": "Item added to cart!" });
              done();
            });
        });

    it('should update the quantity of a product in the cart when a PUT request is made to /cart', (done) => {
        const cartItem = { id: products[1].id, quantity: 2 };
        request.post({
            url: base_url+'cart',
            body: cartItem,
            json: true
          }, (error, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(body).toEqual({ "success": "Item added to cart!" });
          });
        cartItem.quantity = 4;
        request.put({
              url: base_url+'cart',
              body: cartItem,
              json: true
            }, (error, response, body) => {
              expect(response.statusCode).toBe(200);
              expect(body).toEqual({"success": "Success."});
              done();
            });
        });

    it('should return a failure message when trying to checkout with an empty cart', (done) => {
        request.post({
              url: base_url+'checkout',
              body: {
                name: 'John Paul',
                email: 'johnpaul@example.com',
                phonenumber: '1234567890',
                creditcard:{ccname:"John Paul"}
              },
              json: true
            }, (error, response, body) => {
              expect(response.statusCode).toBe(200);
              expect(body).toEqual({ "failure": "Fail."});
              done();
            });
          });
    
    it('should add a user to the checkout when a POST request is made to /checkout if cart has items', (done) => {
            const user = {
              name: 'John Paul',
              email: 'johnpaul@example.com',
              phonenumber: '1234567890',
              creditcard:{ccname:"John Paul"}
            }
            const cartItem = { id: products[1].id, quantity: 2 };
            request.post({
            url: base_url+'cart',
            body: cartItem,
            json: true
          }, (error, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(body).toEqual({ "success": "Item added to cart!" });
          });
            request.post({
              url: base_url+'checkout',
              body: user,
              json: true
            }, (error, response, body) => {
              expect(response.statusCode).toBe(200);
              expect(body).toEqual({"success": "Success."});
              done();
            });
          });
        
    it('should return the list of users', (done)=> {
        request.get(base_url+'user',(error,response,body)=>{
            expect(response.statusCode).toBe(200);
            expect(JSON.parse(body)).toEqual([]);
            done();
          })
    });
    
});