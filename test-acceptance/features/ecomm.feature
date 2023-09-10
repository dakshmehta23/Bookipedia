Feature: Shopping Cart
    As a user
    I want to add items to the cart, view them, filter them, remove them, and purchase them
    So that I can buy products on the website

Scenario: Adding item to cart
Given I am on the Home page
Given I see a book "Mistborn: The Final Empire" that I like
When I click on the book "Mistborn: The Final Empire"
Then I get taken to the Product page which displays the item contents
When I click on the Add to cart button
Then I can see a message “Success: Item added to cart!”
And I see a number displayed on the cart icon in the top right corner

Scenario: View All cart items
Given I am on any page on the website
When I click on the cart icon in the right corner
Then I get taken to the “Cart” Page
And I can see all the items added to the cart

Scenario: Using keywords and different tags to find a product
Given I am on the “Home” page
When I select "HardCover" filter
Then I can see all the products which match the filter "HardCover"
When I want to remove the filters, I click on the reset button
Then I see all the products

Scenario: Duplicating an item in cart
Given I am on the “Cart” page
And I want to duplicate the item "Mistborn: The Final Empire" in the cart
When I click the "+" button next to the “Quantity”
Then the item quantity is updated by 1
And the new total cost is updated

Scenario: Adding Address and payment details
Given I have added item to the cart and I am on cart page
When I click on the "Make Purchase" button
Then I am taken to the “Checkout” page
When I fill in all the required details
When I click Submit button
Then Then I see the message “Items have been purchased Successfully” 

Scenario: Removing Item from cart
Given I have added item to the cart
Given I am on the cart page to remove items
When I find the item to be removed
And I click on the “Remove” button next to the item
Then the item is removed from the cart
And the new total cost is updated after removing item