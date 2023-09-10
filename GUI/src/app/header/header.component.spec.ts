import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ApiService } from '../api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';

type Spy<T extends (...args: any[]) => any> = jasmine.SpyObj<T>;
const obs: Observable<number> = new Observable<number>(observer => {
  observer.next(42);
});
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let apiServiceMock: jasmine.SpyObj<ApiService>;

  beforeEach(async() => {
    apiServiceMock = jasmine.createSpyObj('ApiService', [
      'getProductById',
      'postCartDetails',
      'getCartDetails',
    ]);
   const numOfItemsSubject = new BehaviorSubject<number>(0);
   apiServiceMock.numOfItems$ = numOfItemsSubject.asObservable();
    (apiServiceMock.postCartDetails as jasmine.Spy).and.returnValue(of({ message: 'success' }));
    (apiServiceMock.getProductById as jasmine.Spy).and.returnValue(of({ id: '1' }));
    (apiServiceMock.getCartDetails as jasmine.Spy).and.returnValue(of([{ id: '1' },{id: '2'}]));
    
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [FormsModule],
      providers: [
        { provide: ApiService, useValue: apiServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set the length property when the component is initialized', () => {
    const cartproducts = [{ name: 'product 1' }, { name: 'product 2' }];
    const numOfItems = 2;
    apiServiceMock.getCartDetails.and.returnValue(of(cartproducts));
   // apiServiceMock.numOfItems$ = of(numOfItems);
  //  component.ngOnInit();
    fixture.detectChanges();

    expect(apiServiceMock.getCartDetails).toHaveBeenCalled();
    expect(component.cartproducts).toEqual(cartproducts);
    expect(cartproducts.length).toEqual(numOfItems);
  });
});