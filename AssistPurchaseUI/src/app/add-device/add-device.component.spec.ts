import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AddDeviceComponent } from './add-device.component';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {ProductRecord} from '../Services/ProductRecordService'
import { Observable } from 'rxjs';
import {PurchaseService} from '../Services/Purchase.service'
describe('AddDeviceComponent', () => {
  let component: AddDeviceComponent;
  let fixture: ComponentFixture<AddDeviceComponent>;
  let httpMock: HttpTestingController;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule, RouterTestingModule],
      declarations: [ AddDeviceComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        {provide: 'apiBaseAddress', useValue: "http://localhost:51964"},
        {provide:ProductRecord, useClass:ProductRecord},
        {provide:PurchaseService,useClass:PurchaseService}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AddDeviceComponent);
      component = fixture.componentInstance;
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
  
  it('button click should call addDevice()', fakeAsync(() => {
    spyOn(component, 'addDevice');
    let button = fixture.debugElement.nativeElement.querySelector('#add');
    button.click();
    tick();
    expect(component.addDevice).toHaveBeenCalled();
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
   
  it('should return failure message', () => {
    component.message = undefined;
    component.checkMessage();
    expect(component.message === "Please recheck the information given").toEqual(true);
  });

  it ('shouldnt edit message if message already has content', () => {
    
    component.message = "This is testing";
    component.checkMessage();
    expect (component.message === "This is testing").toEqual(true);
  });

  it('should reset fields', () => {
    component.ProductId = "X3";
    component.reset();
    expect(component.ProductId === "").toEqual(true);
  });

  it('should return success message', () => {
    component.createResponse(200);
    expect(component.message === "Product added successfully").toEqual(true);
  });

  it ('shouldnt edit message if status is not success', () => {
    component.message = "this is testing"
    component.createResponse(400);
    expect (component.message === "this is testing").toEqual(true);
  });

  it ('should create all products list', () => {
    let url = "http://localhost:51964";
    component.addDevice();
    const request = httpMock.expectOne( url + "/api/ProductsDatabase/products");
    expect(request.request.method).toBe('POST');
  });

  
  it ('calling init', () => {
    component.ngOnInit();
  });
});
