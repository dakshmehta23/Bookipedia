//Class Userslist is used to store the User data after a successful checkout
export class Userslist{
    constructor(){
        //Instantiate an empty list when the server has started
        this.userslist = [];
    }
    // Check if the users phone numbers exists in the list
    phoneexists(phone) {
        return !this.userslist.find(a => a.phonenumber == phone);
    }
    // Adding a new user and all the corresponding details to the list
    add(user)
    {
        //If the phone number doesnt exist then we add a new user
        if(this.phoneexists(user.phonenumber))
        {
            this.userslist.push(user);
            return 1;
        }
        else
        {
            //If the phone number does exist then we update the existing user
            var result = this.userslist.findIndex(a => a.phonenumber == user.phonenumber);
            if(result > -1)
            {
                this.userslist[result].update(user);
                return 1;
            }
            else{
                return 0;
            }
        }
    }
    // Return the User list
    display(){
        return this.userslist;
    }
    // Clear the User list
    clear(){
        this.userslist = [];
    }
}