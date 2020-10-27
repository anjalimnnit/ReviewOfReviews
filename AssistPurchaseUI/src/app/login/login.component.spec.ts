import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { LoginComponent } from './login.component'
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {ProductRecord} from '../Services/ProductRecordService'

describe('LoginComponent', () => {
  let component:LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpMock: HttpTestingController;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule, RouterTestingModule],
      declarations: [ LoginComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        {provide: 'apiBaseAddress', useValue: "LoginComponentt"},
        {provide:ProductRecord, useClass:ProductRecord}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('button click should call onLogin()', fakeAsync(() => {
    spyOn(component, 'onLogin');
    let button = fixture.debugElement.nativeElement.querySelector('#login');
    button.click();
    tick();
    expect(component.onLogin).toHaveBeenCalled();
  
  }));

  it('button click should call onReset()', fakeAsync(() => {
    spyOn(component, 'onReset');
    let button = fixture.debugElement.nativeElement.querySelector('#reset');
    button.click();
    tick();
    expect(component.onReset).toHaveBeenCalled();
  }));
   
  it('should return failure message', () => {
    component.errorMessage = undefined;
    component.userName = "";
    component.password = "";
    component.onLogin();
    expect(component.errorMessage === "Invalid Credentials").toEqual(true);

  });

  it ('should navigate to config page on successful login', () => {
    component.errorMessage = undefined;
    component.userName = "admin";
    component.password = "admin@123"
    component.onLogin();
    expect(component.errorMessage === "Login Successfull").toEqual(true);
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/config']);
  });
  it('should reset fields', () => {
    component.userName= "admin";
    component.password="*****"
    component.onReset();
    expect(component.userName === ""&& component.password=== "").toEqual(true);
  });

  it ('edits username value on edit', () => {
    component.userName = "admin";
    component.onUserNameEdit("test");
    expect(component.userName === "test").toEqual(true);
  });

  it ('edits password value on edit', () => {
    component.password = "admin";
    component.onPasswordEdit("test");
    expect(component.password === "test").toEqual(true);
  });

  it ('calling init', () => {
    component.ngOnInit();
  });

 

 
});