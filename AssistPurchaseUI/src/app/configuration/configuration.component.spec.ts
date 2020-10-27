import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ConfigurationComponent } from './configuration.component';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {PurchaseService} from '../Services/Purchase.service'
describe('ConfigurationComponent', () => {
  let component: ConfigurationComponent;
  let fixture: ComponentFixture<ConfigurationComponent>;
  let httpMock: HttpTestingController;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ConfigurationComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        {provide: 'apiBaseAddress', useValue: "http://localhost:51964"},
        {provide:PurchaseService,useValue:PurchaseService}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ConfigurationComponent);
      component = fixture.componentInstance;
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
 /*  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  }); */

  it ('should navigate to add component', () => {
    
    component.navigateAddDevice();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/addDevice']);
  });

  it ('should navigate to delete component', () => {
    
    component.navigateDeleteDevice();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/deleteDevice']);
  });

  it ('should navigate to update component', () => {
    
    component.navigateUpdateDevice();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/updateDevice']);
  });

  it ('should navigate to getProduct component', () => {
    
    component.navigateGetDeviceById();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/getDevice']);
  });

  it('button click should call navigateAddDevice()', fakeAsync(() => {
    spyOn(component, 'navigateAddDevice');
    let button = fixture.debugElement.nativeElement.querySelector('#add');
    button.click();
    tick();
    expect(component.navigateAddDevice).toHaveBeenCalled();
    //expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('button click should call navigateDeleteDevice()', fakeAsync(() => {
    spyOn(component, 'navigateDeleteDevice');
    let button = fixture.debugElement.nativeElement.querySelector('#delete');
    button.click();
    tick();
    expect(component.navigateDeleteDevice).toHaveBeenCalled();
    //expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('button click should call navigateUpdateDevice()', fakeAsync(() => {
    spyOn(component, 'navigateUpdateDevice');
    let button = fixture.debugElement.nativeElement.querySelector('#update');
    button.click();
    tick();
    expect(component.navigateUpdateDevice).toHaveBeenCalled();
    //expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('button click should call navigateGetDeviceById()', fakeAsync(() => {
    spyOn(component, 'navigateGetDeviceById');
    let button = fixture.debugElement.nativeElement.querySelector('#get');
    button.click();
    tick();
    expect(component.navigateGetDeviceById).toHaveBeenCalled();
    //expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('button click should call navigateGetAllDevices()', fakeAsync(() => {
    spyOn(component, 'navigateGetAllDevices');
    let button = fixture.debugElement.nativeElement.querySelector('#getall');
    button.click();
    tick();
    expect(component.navigateGetAllDevices).toHaveBeenCalled();
    //expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it ('should create all products list', () => {
    let url = "http://localhost:51964";
    component.navigateGetAllDevices();
    const request = httpMock.expectOne( url + "/api/ProductsDatabase/products");
    expect(request.request.method).toBe('GET');
  });

  it ('should create response', () => {
    component.records = [];
    let body = [{"productId":"MX40","productName":"IntelliVue","description":"The IntelliVue MX40 patient wearable monitor gives you techFALSElogy, intelligent design, and inFALSEvative features you expect from Philips – in a device light eFALSEugh and small eFALSEugh to be comfortably worn by ambulatory patients.","productSpecificTraining":"TRUE","price":"37000.0","softwareUpdateSupport":"FALSE","portability":"TRUE","compact":"TRUE","batterySupport":"TRUE","thirdPartyDeviceSupport":"FALSE","safeToFlyCertification":"TRUE","touchScreenSupport":"TRUE","multiPatientSupport":"TRUE","cyberSecurity":"FALSE"}];
    component.createResponse(body);
    expect(component.records.length).toEqual(1);
  });

  
  it ('calling init', () => {
    component.ngOnInit();
  });
});
