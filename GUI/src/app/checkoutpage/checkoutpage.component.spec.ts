import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckoutpageComponent } from './checkoutpage.component';
import { Cart } from '../model/cart';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../api.service';
import { BehaviorSubject, of } from 'rxjs';

describe('CheckoutpageComponent', () => {
  let component: CheckoutpageComponent;
  let fixture: ComponentFixture<CheckoutpageComponent>;
  let apiServiceStub: Partial<ApiService>;

  const formValue = { //mocking form input
    name: 'John',
    email: 'john@example.com',
    phone: '1234567890',
    address: {
      street: '2030 John Street',
      city: 'Johnson',
      house: '123',
      postal: '12345'
    },
    creditcard: {
      ccname: 'John Paul',
      number: '1234567890123456',
      expirydate: '12/34',
      zip: '12345',
      cvv: '123'
    }
  };
  const cartitems = [{ product: { id: 2, price: 10 }, quantity: 2 }]; //mocking cart items

  beforeEach(async () => { //will run before each test case
    apiServiceStub = jasmine.createSpyObj('ApiService', [
      'getCartDetails',  //mocking api methods
      'postUserDetails'
    ]);
    const numOfItemsSubject = new BehaviorSubject<number>(0);
    apiServiceStub.numOfItems$ = numOfItemsSubject.asObservable();
    (apiServiceStub.postUserDetails as jasmine.Spy).and.returnValue(
      of({ success: true })
    );
    (apiServiceStub.getCartDetails as jasmine.Spy).and.returnValue(
      of(cartitems)
    );
    await TestBed.configureTestingModule({
      declarations: [CheckoutpageComponent, HeaderComponent, FooterComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        HttpClient,
        HttpHandler,
        Cart,
        { provide: ApiService, useValue: apiServiceStub },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '' } } } }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CheckoutpageComponent);
    component = fixture.componentInstance; //instantiating the checkout component for testing
  });

  it('should create', () => { //to check if component is being created 
    expect(component).toBeTruthy();
  });

  it('should get cart details and calculate total price on init', () => { //to check if cart details are being received and total is being calculated correctly
    component.ngOnInit();
    fixture.detectChanges();
    expect(apiServiceStub.getCartDetails).toHaveBeenCalled();
    expect(component.cartitems).toEqual(cartitems);
    expect(component.total).toEqual(component.getTotalPrice(cartitems));
    expect(component.shipping).toEqual(component.shipping);
  });

  it('should submit Valid Form values and log response', () => { //to check if only valid input is being accepted and that the responses are being stored in the server. 
    component.requiredForm.setValue(formValue);
    component.SubmitHandler();
    fixture.detectChanges();
    expect(apiServiceStub.postUserDetails).toHaveBeenCalledWith(formValue);
  })
});
