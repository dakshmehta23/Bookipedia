const importCwd = require('import-cwd');
const { Given, When, Then } = importCwd('@cucumber/cucumber');
const { browser, $, element, by, ExpectedConditions } = require('protractor');
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
const request= require('request');
const axios = require('axios');
const http = require('http');
const assert = require('assert');

var base_url = "http://localhost:3000/";

//Scenario 1
Given(/^I am on the Home page$/, async () => {
    await browser.get("http://localhost:4200/");
    await expect(browser.getTitle()).to.eventually.equal('ECommerce');
});

Given(/^I see a book "([^\"]*)" that I like$/, async (bookTitle) => {
    const bookTitles = element.all(by.css('.title.mb-2'));
    const matchingBook = await bookTitles.filter(async (book) => {
        const title = await book.getText();
        return title === bookTitle;
      }).first();
    const matchingBookTitle = await matchingBook.getText();
    expect(matchingBookTitle).to.equal(bookTitle);
});

When('I click on the book {string}', async (bookName) => {
    const figcaption = element(by.cssContainingText('figcaption.info-wrap', bookName));
    
    await browser.executeScript('arguments[0].scrollIntoView()', figcaption.getWebElement());
    await browser.sleep(1000);
    await figcaption.click();
});

Then('I get taken to the Product page which displays the item contents', async () => {
    const expectedUrl = 'http://localhost:4200/product/1';
    // Verify that the current URL matches the expected URL
    expect(await browser.getCurrentUrl()).to.equal(expectedUrl);    
});

When('I click on the Add to cart button', async () => {
    // Find and click on the "Add to cart" button
    const addToCartButton = element(by.css('a.btn.btn-primary'));
    await addToCartButton.click();
  });


Then('I can see a message “Success: Item added to cart!”', async () => {
    // Wait for the message to be displayed
    const messageElement = element(by.css('div.label-rating.text-success'));
    await browser.wait(ExpectedConditions.visibilityOf(messageElement), 5000);
  
    // Verify that the message contains the expected text
    const messageText = await messageElement.getText();
    expect(messageText).to.equal('Success: Item added to cart!');
});

Then('I see a number displayed on the cart icon in the top right corner', async () => {
    var spanText = await element(by.id('lblCartCount')).getText();
    expect(spanText).to.equal('1');
});




//Scenario 2
Given('I am on any page on the website', async () => {
    // Navigate to the website
    await browser.get('http://localhost:4200/');
  });

When('I click on the cart icon in the right corner', async () => {
    // Click the My cart button
    const myCartBtn = element(by.css('a[href="/cart"]'));
    await myCartBtn.click();
});

Then('I get taken to the “Cart” Page', async () => {
    await browser.waitForAngular();
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).to.equal('http://localhost:4200/cart');
});

Then('I can see all the items added to the cart', async () => {
    var h5Element = await element(by.css('h5'));
    expect(h5Element.getText()).not.to.equal('Your cart is empty.');
});

//Scenario 3
Given('I am on the “Home” page', async () => {
    // Navigate to the website
    await browser.get('http://localhost:4200/home');
  });

When('I select {string} filter', async (filterValue) => {
    var checkbox = element(by.css(`input[value="${filterValue}"]`));
    await browser.executeScript('arguments[0].scrollIntoView()', checkbox.getWebElement());
    await browser.wait(ExpectedConditions.elementToBeClickable(checkbox), 5000);
    await browser.sleep(1000)
    await checkbox.click();
    expect(checkbox.getAttribute('checked')).to.eventually.equal('true');

});

Then('I can see all the products which match the filter {string}', async (selectedFilterOrCategory) => {
    const response = await fetch('http://localhost:3000/');
    const products = await response.json();
    const filteredProducts = products.filter(product => product.tags.includes(selectedFilterOrCategory));
    const bookNames = await element.all(by.css('p.title.mb-2')).map(book => book.getText());
    filteredProducts.forEach(product => {
        expect(bookNames).to.contain(product.name);
    });
    
});


When('I want to remove the filters, I click on the reset button', async () => {
  // Find and click on the reset button
  const resetButton = await element(by.css('a.btn.btn-primary'));
  await resetButton.click();
});

Then('I see all the products', async () => {
    const bookCount = await element(by.css('strong.d-block.py-2')).getText().then(text => parseInt(text.split(' ')[1]));
    expect(bookCount).to.equal(15);
});


//Scenario 4: Duplicating an item in cart
Given('I am on the “Cart” page', async () => {
    // Navigate to the cart page
    await browser.get('http://localhost:4200/cart');
 });
 
Given(/^I want to duplicate the item "([^\"]*)" in the cart$/, async (bookTitle) => {
    //Check that the book to be duplicated is present in the cart
     const bookTitles = element.all(by.css('a.title'));
     const matchingBook = await bookTitles.filter(async (book) => {
         const title = await book.getText();
         return title === bookTitle;
       }).first();
     const matchingBookTitle = await matchingBook.getText();
     expect(matchingBookTitle).to.equal(bookTitle);
});

When('I click the "+" button next to the “Quantity”', async () => {
    //click the + button to increase quantity
    const increaseQuantity = element(by.id('increaseQuantityButton'));
    await increaseQuantity.click();
});

Then(/^the item quantity is updated by 1$/, async () => {
    // Get the quantity element for the item in the cart
    const quantityElement = element.all(by.id('quan'));
    
    // Get the initial quantity value from the placeholder attribute
    const initialQuantity = await quantityElement.getAttribute('placeholder');

    //click the duplicate button again to increase the quantity
    const duplicateButton = element.all(by.id('increaseQuantityButton'));
    await duplicateButton.click();

    // Get the new quantity
    const newQuantity = await quantityElement.getAttribute('value');

    // Verify that the new quantity value has increased by 1
    expect(parseInt(newQuantity)).to.equal(parseInt(initialQuantity) + 1);
});

Then('the new total cost is updated', async () => {
    //get the quantity of items
    const quantityElement = element.all(by.id('quan'));
    const initialQuantity = await quantityElement.getAttribute('placeholder');

    //verify that total price = Quantity * Price
    const totalCostElement = element(by.css('dd.text-end.text-dark.h5'));
    const totalCostText = await totalCostElement.getText();
    expect(totalCostText).to.equal('$'+ (parseInt(initialQuantity)*15));
});




//Scenario 5
Given('I have added item to the cart and I am on cart page', async () => {
    // Navigate to the website
    await browser.get('http://localhost:4200/cart');
});


When('I click on the "Make Purchase" button', async () => {
    const makePurchaseButton = element(by.css('a[href="/checkout"]'));
    await makePurchaseButton.click();
  });

Then('I am taken to the “Checkout” page', async () => {
    await browser.waitForAngular();
    const currentUrl = await browser.getCurrentUrl();
    expect(currentUrl).to.equal('http://localhost:4200/checkout');
});

When('I fill in all the required details', async () => {
    const nameInputField = element(by.css('input[formControlName="name"]'));
    const userName = 'TestUserName';
    await nameInputField.sendKeys(userName);

    const phoneInputField = element(by.css('input[formControlName="phone"]'));
    const phoneNumber = '9876543210';
    await phoneInputField.sendKeys(phoneNumber);

    const emailInputField = element(by.css('input[formControlName="email"]'));
    const emailID = 'testuser@example.com';
    await emailInputField.sendKeys(emailID);

    const addressInputField = element(by.css('input[formControlName="street"]'));
    const testAddress = 'Test Address';
    await addressInputField.sendKeys(testAddress);

    const cityInputField = element(by.css('input[formControlName="city"]'));
    const testCity = 'Test City';
    await cityInputField.sendKeys(testCity);

    const houseInputField = element(by.css('input[formControlName="house"]'));
    const testHouse = 'Test House';
    await houseInputField.sendKeys(testHouse);

    const postalInputField = element(by.css('input[formControlName="postal"]'));
    const testPostal = '27606';
    await postalInputField.sendKeys(testPostal);

    const cardInputField = element(by.css('input[formControlName="number"]'));
    const testCard = '1234567890987654';
    await cardInputField.sendKeys(testCard);

    const ccnameInputField = element(by.css('input[formControlName="ccname"]'));
    const testccname = 'TestUserName';
    await ccnameInputField.sendKeys(testccname);


    const expirydateInputField = element(by.css('input[formControlName="expirydate"]'));
    const testExpiry = '05/23';
    await expirydateInputField.sendKeys(testExpiry);

    const zipInputField = element(by.css('input[formControlName="zip"]'));
    const testZip = '27606';
    await zipInputField.sendKeys(testZip);

    const cvvInputField = element(by.css('input[formControlName="cvv"]'));
    const testcvv = '123';
    await cvvInputField.sendKeys(testcvv);

});


When('I click Submit button', async () => {
    const submitButton = element(by.css('button[type="submit"]'));
    await browser.executeScript("arguments[0].scrollIntoView()", submitButton.getWebElement());
    await browser.sleep(2000); 
    await submitButton.click();
});

Then('Then I see the message “Items have been purchased Successfully”', async () => {
    const alertDialog = browser.switchTo().alert();
    const alertText = await alertDialog.getText();
    expect(alertText).to.contain('Items have been purchased Successfully');
    alertDialog.accept();
});


Given('I have added item to the cart', async () => {
    const bookName = "Mistborn: The Final Empire"
    await browser.get("http://localhost:4200/");
    const figcaption = element(by.cssContainingText('figcaption.info-wrap', bookName));
    await browser.executeScript('arguments[0].scrollIntoView()', figcaption.getWebElement());
    await browser.sleep(1000);
    await figcaption.click();
    const addToCartButton = await element(by.css('a.btn.btn-primary'));
    await addToCartButton.click();
});


Given('I am on the cart page to remove items', async () => {
    // Navigate to the website
    await browser.get('http://localhost:4200/cart');
});

When('I find the item to be removed', async () => {
    const productName = await element(by.css('.title')).getText();
    const expectedProductName = "Mistborn: The Final Empire"
    expect(productName).to.equal(expectedProductName);
});

let totalproductPrice;
let cartPrice;

When('I click on the “Remove” button next to the item', async () => {
    const priceElement = await element(by.css('var.price.h6'));
    const priceText = await priceElement.getText();
    totalproductPrice = parseFloat(priceText.slice(1)); // remove the $ sign and convert to number
    const totalPurchasePrice = await element(by.css('dd.text-end.text-dark.h5'));
    const totalPurchasePriceText = await totalPurchasePrice.getText();
    cartPrice = parseFloat(totalPurchasePriceText.slice(1)); // remove the $ sign and convert to number

    // Find the Remove button for the desired product
    const removeButton = await element(by.buttonText('Remove'));
    // Click the Remove button
    await removeButton.click();
});


Then('the item is removed from the cart', async () => {
    const emptyCartMessage = await element(by.cssContainingText('h5', 'Your cart is empty.'));
    expect(emptyCartMessage.isPresent()).to.eventually.be.true;
});

Then('the new total cost is updated after removing item', async () => {
    const totalPurchasePrice = await element(by.css('dd.text-end.text-dark.h5'));
    const totalPurchasePriceText = await totalPurchasePrice.getText();
    const updatedPrice = parseFloat(totalPurchasePriceText.slice(1)); // remove the $ sign and convert to number
    const expectedPrice = cartPrice - totalproductPrice;
    expect(updatedPrice).to.equal(expectedPrice);
});
  
