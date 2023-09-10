/*
The User Class is used to store the user details and has the following format:
Name
Address
Email address
Phone number 
Credit card name
Credit card number
Expiry Date
Zip
*/

export class Users{
    constructor(userinfo){
        this.name = userinfo.name;
        this.address = userinfo.address    
        this.email = userinfo.email      
        this.phonenumber = userinfo.phone 
        this.creditcardname = userinfo.creditcard.ccname
        this.creditcardnumber = userinfo.creditcard.number
        this.expirydate = userinfo.creditcard.expirydate
        this.zip = userinfo.creditcard.zip
    }
    update(userinfo)
    {
        this.name = userinfo.name;
        this.address = userinfo.address    
        this.email = userinfo.email      
        this.creditcardname = userinfo.creditcardname
        this.creditcardnumber = userinfo.creditcardnumber
        this.expirydate = userinfo.expirydate
        this.zip = userinfo.zip
    }
}