import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { ChatBotComponent } from './chat-bot.component';
import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {PurchaseService} from '../Services/Purchase.service'
describe('ChatBotComponent', () => {
  let component: ChatBotComponent;
  let fixture: ComponentFixture<ChatBotComponent>;
  let httpMock: HttpTestingController;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientTestingModule, RouterTestingModule],
      declarations: [ ChatBotComponent ],
      providers: [
        {provide: Router, useValue: routerSpy },
        {provide: 'apiBaseAddress', useValue: "http://localhost:51964"},
        {provide:PurchaseService,useValue:PurchaseService}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(ChatBotComponent);
      component = fixture.componentInstance;
      httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    });
  });

  it('button click should call enterText()', fakeAsync(() => {
    spyOn(component, 'enterText');
    let button = fixture.debugElement.nativeElement.querySelector('#submit');
    button.click();
    tick();
    expect(component.enterText).toHaveBeenCalled();
    //expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it('button click should call navigate()', fakeAsync(() => {
    spyOn(component, 'navigate');
    let button = fixture.debugElement.nativeElement.querySelector('#contact');
    button.click();
    tick();
    expect(component.navigate).toHaveBeenCalled();
    //expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));

  it ('should navigate to chatbot page', () => {
    
    component.navigate();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/customerinfo']);
  });

  it ('enterText() should edit values', () => {
    component.boxText = "compact";
    component.flag = true;
    component.enterText();
    expect(component.flag).toEqual(false);
    expect(component.boxText === "").toEqual(true);
  });

  it ('getPreference() should edit prefer to below', () => {
    component.boxText = "price below";
    component.getPreference(component.boxText);
    expect(component.prefer).toEqual("below");
  });

  it ('getPreference() should edit prefer to above', () => {
    component.boxText = "price above";
    component.getPreference(component.boxText);
    expect(component.prefer).toEqual("above");
  });

  it ('onTextBoxEdit() should edit boxText value', () => {
    component.boxText = "This is testing";
    component.onTextBoxEdit("Testing done!!");
    expect(component.boxText).toEqual("Testing done!!");
  });  

  it ('should return products names with compact filter', () => {
    let url = "http://localhost:51964";
    component.boxText = "products which are compact"
    component.flag = false;
    component.checkForCompactFilter(component.boxText);
    const request = httpMock.expectOne( url + "/api/productfilters/filters/compact/true");
    expect(request.request.method).toBe('GET');
  });

  it ('should return products names with portable filter', () => {
    let url = "http://localhost:51964";
    component.boxText = "products which are portable"
    component.flag = false;
    component.checkForPortableFilter(component.boxText);
    const request = httpMock.expectOne( url + "/api/productfilters/filters/portability/true");
    expect(request.request.method).toBe('GET');
  });

  it ('should return products names with battery filter', () => {
    let url = "http://localhost:51964";
    component.boxText = "products which have good battery life"
    component.flag = false;
    component.checkForBatteryFilter(component.boxText);
    const request = httpMock.expectOne( url + "/api/productfilters/filters/batterysupport/true");
    expect(request.request.method).toBe('GET');
  });

  it ('should return products names with cyber security filter', () => {
    let url = "http://localhost:51964";
    component.boxText = "products which have good cyber security"
    component.flag = false;
    component.checkForCyberSecurityFilter(component.boxText);
    const request = httpMock.expectOne( url + "/api/productfilters/filters/cybersecurity/true");
    expect(request.request.method).toBe('GET');
  });

  it ('should return products names with software updates filter', () => {
    let url = "http://localhost:51964";
    component.boxText = "products which have software update support"
    component.flag = false;
    component.checkForSoftwareUpdateFilter(component.boxText);
    const request = httpMock.expectOne( url + "/api/productfilters/filters/softwareupdatesupport/true");
    expect(request.request.method).toBe('GET');
  });

  it ('should return products names with product specific training filter', () => {
    let url = "http://localhost:51964";
    component.boxText = "products which require product training"
    component.flag = false;
    component.checkForProductTrainingFilter(component.boxText);
    const request = httpMock.expectOne( url + "/api/productfilters/filters/productspecifictraining/true");
    expect(request.request.method).toBe('GET');
  });

  it ('should return products names with touch screen filter', () => {
    let url = "http://localhost:51964";
    component.boxText = "products which have touch screen feature"
    component.flag = false;
    component.checkForTouchScreenFilter(component.boxText);
    const request = httpMock.expectOne( url + "/api/productfilters/filters/touchscreen/true");
    expect(request.request.method).toBe('GET');
  });

  it ('should return products names with third party device filter', () => {
    let url = "http://localhost:51964";
    component.boxText = "products which have third party device support"
    component.flag = false;
    component.checkForThirdPartyDeviceFilter(component.boxText);
    const request = httpMock.expectOne( url + "/api/productfilters/filters/thirdpartydevicesupport/true");
    expect(request.request.method).toBe('GET');
  });

  it ('should return products names with safe to fly filter', () => {
    let url = "http://localhost:51964";
    component.boxText = "products which are safe to fly"
    component.flag = false;
    component.checkForSafeToFlyFilter(component.boxText);
    const request = httpMock.expectOne( url + "/api/productfilters/filters/safetofly/true");
    expect(request.request.method).toBe('GET');
  });

  it ('should return products names with price filter', () => {
    let url = "http://localhost:51964";
    component.amount = 20000;
    component.boxText = "products which have below price"
    component.flag = false;
    component.checkForPriceFilter(component.boxText);
    const request = httpMock.expectOne( url + "/api/productfilters/filters/price/"+component.amount+"/below");
    expect(request.request.method).toBe('GET');
  });

  it ('should return products names with multi patient filter', () => {
    let url = "http://localhost:51964";
    component.boxText = "products which have multi-patient support"
    component.flag = false;
    component.checkForMultiPatientFilter(component.boxText);
    const request = httpMock.expectOne( url + "/api/productfilters/filters/multipatientsupport/true");
    expect(request.request.method).toBe('GET');
  });

  

  it ('creates reposne', () => {
    component.result = "";
    let body = ["IntelliVue MX40", "IntelliVue MP2", "IntelliVue MX450", "IntelliVue MMSX2", "IntelliVue MX500", "IntelliVue MX550", "IntelliVue MX400", "IntelliVue MP5T", "IntelliVue MX100", "Efficia CM", "Goldway G40E", "Mock Product X3", "Mock Product AB"]
    component.createResponse(body);
    expect(component.result).toEqual("IntelliVue MX40\nIntelliVue MP2\nIntelliVue MX450\nIntelliVue MMSX2\n")
  });

  it ('calling init', () => {
    component.ngOnInit();
  });
});
