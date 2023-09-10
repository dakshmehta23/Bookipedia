import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import { HomepageComponent } from './homepage.component';
import { Cart } from '../model/cart';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApiService } from '../api.service';
import { of } from 'rxjs';

describe('HomepageComponent', () => {
  let component: HomepageComponent;
  let fixture: ComponentFixture<HomepageComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomepageComponent ,HeaderComponent,FooterComponent],
        imports: [HttpClientTestingModule,BrowserModule,
          FormsModule], 
        providers: [HttpClient, Cart]}
      
    )
    .compileComponents();
  });
    beforeEach(() => {
      fixture = TestBed.createComponent(HomepageComponent);
      component = fixture.componentInstance;
      apiService = TestBed.inject(ApiService);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should call getProductList on init', () => {
      const books = [{ id: 1, title: 'Book 1', tags: '@tag1@tag2' }];
      spyOn(apiService, 'getProductList').and.returnValue(of(books));
      fixture.detectChanges();
      expect(apiService.getProductList).toHaveBeenCalled();
      expect(component.books).toEqual(books);
    });
  
    it('should filter books by tag', () => {
      const books = [
        { id: 1, title: 'Book 1', tags: '@tag1@tag2' },
        { id: 2, title: 'Book 2', tags: '@tag1@tag3' },
        { id: 3, title: 'Book 3', tags: '@tag4@tag5' }
      ];
      component.books = books;
      const event = { target: { checked: true } };
      const tag = 'tag1';
      component.filterBooks(event, tag);
      expect(component.isFiltered).toBeTrue();
      expect(component.filteringTags).toContain(tag);
      expect(component.filteredBooks).toContain(books[0]);
      expect(component.filteredBooks).toContain(books[1]);
    });
  
    it('should reset the filter', () => {
      const books = [{ id: 1, title: 'Book 1', tags: '@tag1@tag2' }];
      component.books = books;
      component.isFiltered = true;
      component.filteringTags = ['tag1'];
      component.filteredBooks = books;
      component.resetFilter();
      expect(component.isFiltered).toBeFalse();
      expect(component.filteringTags.length).toEqual(0);
      expect(component.filteredBooks.length).toEqual(0);
      expect(component.checkboxValues).toEqual({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
        checkbox6: false,
        checkbox7: false,
        checkbox8: false,
        checkbox9: false,
        checkbox10: false,
        checkbox11: false,
        checkbox12: false
      });
    });
  })