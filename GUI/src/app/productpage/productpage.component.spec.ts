import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../api.service';
import { Cart } from '../model/cart';
import { ProductpageComponent } from './productpage.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BehaviorSubject, of } from 'rxjs';

describe('ProductpageComponent', () => {
  let component: ProductpageComponent;
  let fixture: ComponentFixture<ProductpageComponent>;
  let apiServiceStub: Partial<ApiService>;
  beforeEach(async () => {
    
    apiServiceStub = jasmine.createSpyObj('ApiService', [
      'getProductById',
      'postCartDetails',
      'getCartDetails',
      
    ]);
    const numOfItemsSubject = new BehaviorSubject<number>(0);
    apiServiceStub.numOfItems$ = numOfItemsSubject.asObservable();
    (apiServiceStub.postCartDetails as jasmine.Spy).and.returnValue(of({ message: 'success' }));
    (apiServiceStub.getProductById as jasmine.Spy).and.returnValue(of({ id: '1' }));
    (apiServiceStub.getCartDetails as jasmine.Spy).and.returnValue(of({ id: '1' }));
    await TestBed.configureTestingModule({
      declarations: [ ProductpageComponent, HeaderComponent, FooterComponent ],
      imports: [ RouterTestingModule ,BrowserModule, FormsModule],
      providers: [
        Cart,
        { provide: ApiService, useValue: apiServiceStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        },
        HttpClient, HttpHandler
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductpageComponent);
    component = fixture.componentInstance;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve product details on initialization', () => {
    const product = { id: '1', imagepath: 'assets/images/books/mistborn-finalempire.jpg' };
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.product.id).toEqual(product.id);
  });

  it('should increase and decrease the quantity', () => {
    component.product = { id: 1, name: 'Product A', stockcount: 5 };
    component.quantity = 1;
    component.increaseQuantity();
    expect(component.quantity).toEqual(2);
    component.reduceQuantity();
    expect(component.quantity).toEqual(1);
  });

  it('should add item to cart', () => {
    component.product = { id: 1, name: 'Product A', stockcount: 5 };
    component.quantity = 3;
    component.addToCart();
    fixture.detectChanges();
    expect(apiServiceStub.postCartDetails).toHaveBeenCalledWith(1, 3);
  });

  
});