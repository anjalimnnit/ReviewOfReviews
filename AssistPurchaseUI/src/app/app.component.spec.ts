import { TestBed, fakeAsync, ComponentFixture, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';


describe('AppComponent', () => {
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
    });
  });

  it('button click should call navigateToHome()', fakeAsync(() => {
    spyOn(component, 'navigateToHome');
    let button = fixture.debugElement.nativeElement.querySelector('#home');
    button.click();
    tick();
    expect(component.navigateToHome).toHaveBeenCalled();
    //expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));
  
  it ('should navigate to home page', () => {
    
    component.navigateToHome();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('button click should call navigateToChatBot()', fakeAsync(() => {
    spyOn(component, 'navigateToChatBot');
    let button = fixture.debugElement.nativeElement.querySelector('#chatbot');
    button.click();
    tick();
    expect(component.navigateToChatBot).toHaveBeenCalled();
    //expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));
  
  it ('should navigate to chatbot page', () => {
    
    component.navigateToChatBot();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/chatbot']);
  });

  it('button click should call navigateToLogin()', fakeAsync(() => {
    spyOn(component, 'navigateToLogin');
    let button = fixture.debugElement.nativeElement.querySelector('#config');
    button.click();
    tick();
    expect(component.navigateToLogin).toHaveBeenCalled();
    //expect (routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  }));
  
  it ('should navigate to configuration page', () => {
    
    component.navigateToLogin();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  /* it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'AssistPurchaseUI'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('AssistPurchaseUI');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('AssistPurchaseUI app is running!');
  }); */
});
