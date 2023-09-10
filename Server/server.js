import express from 'express';
import bodyParser from 'body-parser';

import productlist, { updateproductlist } from './productlist.js'
import { Cart } from './cart.js'
import { CartList } from './cartlist.js';
import { Users } from './users.js';
import { Userslist } from './userslist.js';

var ecommserver = express();
 
const products = productlist;
var cartlist = new CartList();
var usesrslist = new Userslist();

//Allow Cross Domain function, helps us deal with the CORS issue faced when transferring data between two websites
var allowCrossDomain = function(req, res, next)
{
  res.header('Access-Control-Allow-Origin', '*'); // add the Access-Control-Allow-Origin header
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
}
ecommserver.use(allowCrossDomain);
ecommserver.use(bodyParser.json());

//sending all products as a list
ecommserver.get('/', function (req, res) {
  res.send(products);
})

//sending a particular product according to id
ecommserver.get('/product/:id', function (req, res) {
  
  const productId = req.params.id; // get the parameter value from the request object
  const product = products.find(p => p.id == productId); // find the product in the list
  if (product) {
    res.send(product); // send the product as the response
  } else {
    res.status(404).send('Product not found'); // send an error response if the product is not found
  }
})

//data sent as post to store items and quantities in the cart
ecommserver.post('/cart', function (req, res) {
  var cartitem = new Cart(req.body.id,req.body.quantity);
  var successcode = cartlist.add(cartitem); // item is added to the cart
  // if data is successfully added then we return the Success status
  if (successcode) {
    res.send({"success": "Item added to cart!"});
  } else {
    res.send({"failure": "Fail."});
  }
})

//data send as put to update items and quantities added in cart
ecommserver.put('/cart', function (req, res) {
  var cartitem = new Cart(req.body.id,req.body.quantity);
  var successcode = cartlist.update(cartitem); //item is updated
  // if data is successfully updated then we return the Success status
  if (successcode) {
    res.send({"success": "Success."});
  } else {
    res.send({"failure": "Fail."});
  }
})

// sending all products added in cart
ecommserver.get('/cart', function (req, res) {
  var cartproducts = [];
  var results = cartlist.display(); // Get the cart list
  if(results.length > 0){
    results.forEach(addtoList);
    function addtoList(item)
    {
      cartproducts.push({"product": products.find(p => p.id == item.id),"quantity":item.quantity}); // Creating a list of products and their quantities
    }
    res.send(cartproducts); // Sending the list created
  }
  else{
    res.send({"Failure" : "Cart is empty"});
  }
})

//data sent as post to perform checkout and store user data on the server
ecommserver.post('/checkout',function(req,res){
  var userinfo = new Users(req.body);
  var productsinfo = cartlist.display(); // Cart items are stored in the list
  var purchasecode = updateproductlist(productsinfo); // Cart items are sent to the product list to update the stock count of the corresponding products
  var successcode = usesrslist.add(userinfo); // User is added to the list
  // if user data is successfully added and the product list is updated then we return the Success status
  if(successcode && purchasecode){
    cartlist.clear();
    res.send({"success": "Success."});
  } else {
    res.send({"failure": "Fail."});
  }
})

// sending all user details added in the list
ecommserver.get('/user',function(req,res){
  res.send(usesrslist.display());
})

var server = listenServer(3000)
// listen to the connections on the specified host and port
function listenServer(port)
{
  return ecommserver.listen(port, function () {
    console.log('Ecommerce app listening on port '+port );
  })
}
// close the connections and clear any data
function closeServer(value){
  value.close();
  cartlist.clear();
  usesrslist.clear();
}

export {listenServer , closeServer }