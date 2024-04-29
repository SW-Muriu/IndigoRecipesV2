import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from '../../../architecture/services/notification/notification.service';
import { AuthService } from '../../services/authservices/auth.service';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('SigninComponent', () => {
  let component: SigninComponent
  let fixture: ComponentFixture<SigninComponent>;
  let fb: FormBuilder;
  let notificationManMock: any;
  let authManServiceMock: any;
  let routerMock: any

  beforeEach(async () => {

    authManServiceMock = {
      logInUser: jest.fn().mockReturnValue(of({ statusCode: 200, entity: {}, message: "" })),
    }

    //Router Mock
    routerMock = {
      navigate: jest.fn(),
    }

    //Mock Snackbar
    notificationManMock = {
      showNotificationMessage: jest.fn(),
    }

    await TestBed.configureTestingModule({
      imports: [
        SigninComponent,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        FormBuilder,
        { provide: NotificationService, useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: Router, useValue: {} }

      ]
    })
      .compileComponents();


    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the method ngOninit', () => {
    const jestSpy = jest.spyOn(component, 'ngOnDestroy');
    component.ngOnDestroy();
    expect(jestSpy).toHaveBeenCalled();
  });

  it('should call authService.logInUser and navigate to home on successful login', () => {
    // Mock signInForm value
    component.signInForm.setValue({
      userNameOrEmail: 'test@example.com',
      password: '123456'
    });

    // Trigger login function
    component.onLogin();

    // Check if logInUser is called with correct params
    expect(authManServiceMock.logInUser).toHaveBeenCalledWith(
      { userNameOrEmail: 'test@example.com' },
      expect.any(Object) // Use HttpParams
    );

    // Check if sessionStorage is set correctly
    expect(sessionStorage.setItem).toHaveBeenCalledTimes(4);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('username', '');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('firstName', '');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('lastName', '');
    expect(sessionStorage.setItem).toHaveBeenCalledWith('email', '');

    // Check if router.navigate is called with correct route
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);

    // Check if snackbar showNotificationMessage is called with correct message and class
    expect(notificationManMock.showNotificationMessage).toHaveBeenCalledWith('Success message', 'login-snackbar');
  });

})

