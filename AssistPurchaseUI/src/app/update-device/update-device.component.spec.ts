import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { UpdateDeviceComponent } from './update-device.component';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {ProductRecord} from '../Services/ProductRecordService'
import{PurchaseService} from '../Services/Purchase.service';
describe('UpdateDeviceComponent', () => {
  let component: UpdateDeviceComponent;
  let fixture: ComponentFixture<UpdateDeviceComponent>;
  let httpMock: HttpTestingController;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule, RouterTestingModule],
      declarations: [ UpdateDeviceComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        {provide: 'apiBaseAddress', useValue: "http://localhost:51964"},
        {provide:ProductRecord, useClass:ProductRecord},
        {provide:PurchaseService,useClass:PurchaseService}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(UpdateDeviceComponent);
      component = fixture.componentInstance;
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    });
  });
  
  it('button click should call onUpdate()', fakeAsync(() => {
    spyOn(component, 'onUpdate');
    let button = fixture.debugElement.nativeElement.querySelector('#update');
    button.click();
    tick();
    expect(component.onUpdate).toHaveBeenCalled();
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
    expect(component.message === "Product updated successfully").toEqual(true);
  });

  it ('shouldnt edit message if status is not success', () => {
    component.message = "this is testing"
    component.createResponse(400);
    expect (component.message === "this is testing").toEqual(true);
  });

  it ('should create all products list', () => {
    let url = "http://localhost:51964";
    component.ProductId = "X3"
    component.onUpdate();
    const request = httpMock.expectOne( url + "/api/ProductsDatabase/products/" +component.ProductId);
    expect(request.request.method).toBe('PUT');
  });

  
  it ('calling init', () => {
    component.ngOnInit();
  });

});
