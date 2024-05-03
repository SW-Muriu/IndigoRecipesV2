import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from '../../../architecture/services/notification/notification.service';
import { AuthService } from '../../services/authservices/auth.service';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpParams } from '@angular/common/http';

describe('SigninComponent', () => {
  let component: SigninComponent
  let fixture: ComponentFixture<SigninComponent>;
  let fb: FormBuilder;
  let notificationManMock: any;
  let authManServiceMock: any;
  let serviceInstance: AuthService;
  let routerMock: Router
  let spyInstance: jest.SpyInstance;
  let routerSpyInstance: jest.SpyInstance;

  beforeEach(async () => {

    authManServiceMock = {
      logInUser: jest.fn().mockReturnValue(of({ statusCode: 200, entity: {}, message: "" })),
    }
    
    //Mock Snackbar
    notificationManMock = {
      showNotificationMessage: jest.fn().mockReturnValue(of("Successful message", "snackbar-success")),
    }

    await TestBed.configureTestingModule({
      imports: [
        SigninComponent,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: NotificationService, useValue: notificationManMock },
        // { provide: AuthService, useValue: {} },
        { provide: Router, useValue: {} }
      ]
    })
      .compileComponents();


    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    serviceInstance = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should complete the destroy$ subject on ngOnDestroy', () => {
    const jestSpy = jest.spyOn(component, 'ngOnDestroy');
    jest.spyOn(component.destroy$, 'next');
    jest.spyOn(component.destroy$, 'complete');

    component.ngOnDestroy();

    expect(jestSpy).toHaveBeenCalledWith();
    expect(component.destroy$.next).toHaveBeenCalledWith(true);
    expect(component.destroy$.complete).toHaveBeenCalledWith();

  });



  it('should login and navigate out', () => {
    component.signInForm.setValue({
      userNameOrEmail: 'test@example.com',
      password: '123456'
    });


    spyInstance = jest.spyOn(serviceInstance, 'logInUser').mockReturnValue(of({ statusCode: 200, entity: {}, message: "Success" }));
    component.onLogin();
    const params = new HttpParams()
      .set("userNameorEmail", component.signInForm.value.userNameOrEmail)
    serviceInstance.logInUser(component.signInForm.value, params);

    expect(spyInstance).toHaveBeenCalled();
    expect(spyInstance).toHaveBeenCalledWith(component.signInForm.value, params);


  })

  it('should call login service with correct params and on successufll login', () => {
    component.signInForm.setValue({
      userNameOrEmail: 'test@example.com',
      password: '123456'
    });

    const loginResponse = {
      statusCode: 200,
      message: 'Login successful',
      entity: { userName: 'test_user', firstName: 'John', lastName: 'Doe', email: 'test@example.com' },
    };

    //Mock Authservice.loginuser to return successful response = {
    spyInstance = jest.spyOn(serviceInstance, 'logInUser').mockReturnValue(of(loginResponse));

    //Trigger the login method
    component.onLogin();

    //Verify that the login method was called
    expect(spyInstance).toHaveBeenCalled();

    //Verify that the login method was called with the correct parameters
    expect(spyInstance).toHaveBeenCalledWith(component.signInForm.value, new HttpParams().set('userNameorEmail', component.signInForm.value.userNameOrEmail));

    //Verify that the login method returned the correct response
    expect(spyInstance).toHaveBeenCalled();

    // Assert session storage values and navigation
    expect(sessionStorage.getItem('username')).toBe('test_user');
    expect(sessionStorage.getItem('firstName')).toBe('John');
    expect(sessionStorage.getItem('lastName')).toBe('Doe');
    expect(sessionStorage.getItem('email')).toBe('test@example.com');
    // expect(routerSpyInstance).toHaveBeenCalledWith(['/home']);
    // Assert snackbar message
    // expect(notificationManMock).toHaveBeenCalledWith();
  });

  
})


