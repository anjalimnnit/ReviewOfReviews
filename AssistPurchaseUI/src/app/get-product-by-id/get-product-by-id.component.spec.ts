import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { GetProductByIdComponent } from './get-product-by-id.component'
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {ProductRecord} from '../Services/ProductRecordService'
import {PurchaseService}  from '../Services/Purchase.service'
describe('GetProductByIdComponent', () => {
  let component:GetProductByIdComponent;
  let fixture: ComponentFixture<GetProductByIdComponent>;
  let httpMock: HttpTestingController;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule, RouterTestingModule],
      declarations: [ GetProductByIdComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        {provide: 'apiBaseAddress', useValue: "http://localhost:51964"},
        {provide:ProductRecord, useClass:ProductRecord},
        {provide:PurchaseService,useClass:PurchaseService}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(GetProductByIdComponent);
      component = fixture.componentInstance;
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('button click should call onDelete()', fakeAsync(() => {
    spyOn(component, 'onGet');
    let button = fixture.debugElement.nativeElement.querySelector('#get');
    button.click();
    tick();
    expect(component.onGet).toHaveBeenCalled();
  
  }));

  it('button click should call reset()', fakeAsync(() => {
    spyOn(component, 'reset');
    let button = fixture.debugElement.nativeElement.querySelector('#reset');
    button.click();
    tick();
    expect(component.reset).toHaveBeenCalled();
  }));
   
  it ('should create response', () => {
    
    component.htmlMessage = ""
    let body = {"productId":"MX40"};
    component.createResponse(body);
    expect(component.htmlMessage).toEqual("productId : MX40<br>")
    
  });

  it ('shouldnt create response when body null', () => {
    
    component.htmlMessage = ""
    let body = null;
    component.createResponse(body);
    expect(component.htmlMessage).toEqual("");
    
  });

  it('should reset fields', () => {
    component.productId = "X3";
    component.reset();
    expect(component.productId === "").toEqual(true);
  });

  it('should return failure message', () => {
    component.htmlMessage = undefined;
    component.checkMessage();
    expect(component.htmlMessage === "Please recheck the information given").toEqual(true);
  });

  it ('shouldnt edit message if message already has content', () => {
    
    component.htmlMessage = "This is testing";
    component.checkMessage();
    expect (component.htmlMessage === "This is testing").toEqual(true);
  });
 
  it ('should return product', () => {
    let url = "http://localhost:51964";
    component.productId = "X3"
    component.onGet();
    const request = httpMock.expectOne( url + "/api/ProductsDatabase/products/" +component.productId);
    expect(request.request.method).toBe('GET');
  });

  it ('calling init', () => {
    component.ngOnInit();
  });
});