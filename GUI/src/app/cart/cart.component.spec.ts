import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CartComponent } from './cart.component';
import { Cart } from '../model/cart';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../api.service';
import { BehaviorSubject, of } from 'rxjs';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let apiServiceStub: Partial<ApiService>;

  const cartproducts = [{ product: { id: '2', price: 10 }, quantity: 2 }];

  beforeEach(async () => {
    apiServiceStub = jasmine.createSpyObj('ApiService', [
      'getCartDetails',
      'updateCartDetails',
      'setNumOfItems'
    ]);
    (apiServiceStub.getCartDetails as jasmine.Spy).and.returnValue(
      of(cartproducts)
    );
    (apiServiceStub.updateCartDetails as jasmine.Spy).and.returnValue(of({ message: 'success' }));
    (apiServiceStub.setNumOfItems as jasmine.Spy).and.returnValue(of({}));
    const numOfItemsSubject = new BehaviorSubject<number>(0);
    apiServiceStub.numOfItems$ = numOfItemsSubject.asObservable();
    await TestBed.configureTestingModule({
      declarations: [CartComponent, HeaderComponent, FooterComponent],
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
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get cart details', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(apiServiceStub.getCartDetails).toHaveBeenCalled();
    expect(component.cartproducts).toEqual(cartproducts);
  });

  it('should calculate total', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.total).toEqual(component.getTotalPrice(cartproducts));
  });

  it('should increase the quantity', () => {
    component.cartproducts = [{ product: { id: '2', price: 10, stockcount: 100 }, quantity: 2 }];;
    component.quantity = 1;
    component.increaseQuantity((2).toString(), 2);
    expect(component.cartproducts[0].quantity).toEqual(3);
  });

  it('should decrease the quantity', () => {
    component.cartproducts = [{ product: { id: '2', price: 10, stockcount: 100 }, quantity: 2 }];;
    component.quantity = 1;
    component.reduceQuantity((2).toString(), 2);
    expect(component.cartproducts[0].quantity).toEqual(1);
  });

  it('should remove item from cart', () => {
    component.cartproducts = [{ product: { id: '2', price: 10, stockcount: 100 }, quantity: 2 }];;
    component.deleteItem('2', 2);
    expect(component.cartproducts[0].quantity).toBe(0);
    expect(apiServiceStub.updateCartDetails).toHaveBeenCalledWith('2', '0');
  });
});