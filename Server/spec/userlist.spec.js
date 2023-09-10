import { Users } from '../users.js';
import { Userslist } from '../userslist.js';

//Unit Test for the UsersList and its corresponding functions
describe('Userslist', () => {
  let userslist;

  beforeEach(() => {
    userslist = new Userslist();
    console.log('\nStarting new test for User List')
  });

  it('should add a new user to the list', () => {
    const user = new Users({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phonenumber: '1234567890',
      creditcard:{name:"John Doe"}
    });

    const result = userslist.add(user);
    expect(result).toEqual(1);
    expect(userslist.display()).toContain(user);
  });

  it('should update an existing user in the list', () => {
    const user = new Users({
      name: "John Doe",
      email: 'johndoe@example.com',
      phonenumber: '1234567890',
      creditcard:{ccname:"John Doe"}
    });

    userslist.add(user);

    const updatedUser = new Users({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phonenumber: '1234567890',
      address: '123 Main St',
      creditcard:{ccname:"John Doe"}
    });

    const result = userslist.add(updatedUser);
    expect(result).toEqual(1);
    expect(userslist.display()).toContain(updatedUser);
  });

  it('should return the user list array',()=>{
    const user1 = new Users({
        name : 'John Doe',
        email: 'johndoe@example.com',
        phonenumber: '1234567890',
        creditcard:{ccname:"John Doe"}
      });
    userslist.add(user1);
    expect(userslist.display()).toEqual([user1]);
})
});
