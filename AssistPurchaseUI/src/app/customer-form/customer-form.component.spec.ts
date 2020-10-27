import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { CustomerFormComponent } from './customer-form.component';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomerAlert } from '../Services/CustomerAlertService';
import {PurchaseService} from '../Services/Purchase.service'
describe('CustomerFormComponent', () => {
  let component: CustomerFormComponent;
  let fixture: ComponentFixture<CustomerFormComponent>;
  let httpMock: HttpTestingController;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

   beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule, RouterTestingModule],
      declarations: [ CustomerFormComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        {provide: 'apiBaseAddress', useValue: "http://localhost:51964"},
        {provide: CustomerAlert, useClass: CustomerAlert},
        {provide:PurchaseService,useClass:PurchaseService}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CustomerFormComponent);
      component = fixture.componentInstance;
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    });
  });

  it('button click should call contactSalesPerson()', fakeAsync(() => {
    spyOn(component, 'contactSalesPerson');
    let button = fixture.debugElement.nativeElement.querySelector('#contact');
    button.click();
    tick();
    expect(component.contactSalesPerson).toHaveBeenCalled();
    //expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('button click should call reset()', fakeAsync(() => {
    spyOn(component, 'reset');
    let button = fixture.debugElement.nativeElement.querySelector('#reset');
    button.click();
    tick();
    expect(component.reset).toHaveBeenCalled();
    //expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it ('should edit message for failure case', () => {
    
    component.message = undefined;
    component.checkMessage();
    expect (component.message === "Please recheck the information given").toEqual(true);
  });

  it ('shouldnt edit message if message already has content', () => {
    
    component.message = "This is testing";
    component.checkMessage();
    expect (component.message === "This is testing").toEqual(true);
  });

  it ('should edit message for failure case', () => {
    component.createResponse(200);
    expect (component.message === "Our sales person will contact you shortly. Thank you for visiting").toEqual(true);
  });

  it ('shouldnt edit message if status is not success', () => {
    component.message = "this is testing"
    component.createResponse(400);
    expect (component.message === "this is testing").toEqual(true);
  });

  it ('should reset values', () => {
    component.emailId = "test@gmail.com";
    component.customerName = "test";
    component.phoneNumber = "7634877209";
    component.reset();
    expect (component.emailId === "").toEqual(true);
    expect (component.customerName === "").toEqual(true);
    expect (component.phoneNumber === "").toEqual(true);
  });

  it ('should send data to sales person', () => {
    let url = "http://localhost:51964";
    
    component.contactSalesPerson();
    const request = httpMock.expectOne( url + "/api/alert/alerts");
    expect(request.request.method).toBe('POST');
  });
  
  it ('calling init', () => {
    component.ngOnInit();
  });
});
