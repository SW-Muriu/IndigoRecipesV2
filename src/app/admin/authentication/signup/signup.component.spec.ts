import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../architecture/services/notification/notification.service';
import { AuthService } from '../../services/authservices/auth.service';
import { of, throwError } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authManService: AuthService;
  let snackbarManService: NotificationService;
  let router: Router;
  

  

  //Mock Response
  const successfulResponse = {
    statusCode: 200,
    message: 'User registered successfully!',
    entity: { userName: 'testuser', email: 'test@example.com' },
  };

  const errorResponse = {
    statusCode: 400,
    message: 'User registered successfully!',
    entity: {},
  }

  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [
        SignupComponent,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        {
          provide: AuthService, 
          useValue: {
            registerUser: jest.fn(),
          }
        }, 
        {
          provide: Router, 
          useValue: {
            navigate: jest.fn(),
          }
        }, 
        {
          provide: NotificationService, 
          useValue: {
            showNotificationMessage: jest.fn()
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    authManService = TestBed.inject(AuthService);
    snackbarManService = TestBed.inject(NotificationService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should register user and navigate to home on successful signup (200)', () => {
    //Mock Form
    component.signupForm.setValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      userName: 'testuser',
      password: 'password',
      confirmPassword: 'password',
    });
   
    const registerUser$ = authManService.registerUser as jest.Mock;
    registerUser$.mockReturnValue(of(successfulResponse))
    jest.spyOn(snackbarManService, "showNotificationMessage");
    jest.spyOn(router, "navigate");

    component.onSignUp();

    expect(registerUser$).toHaveBeenCalledWith(component.signupForm.value);
    expect(snackbarManService.showNotificationMessage).toHaveBeenCalledWith(successfulResponse.message, "snackbar-success");
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });


  it('should call registerUser on authService and handle an errorResponse(not 200)', () => {
    component.signupForm.setValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      userName: 'testuser',
      password: 'password',
      confirmPassword: 'password',
    });


    const registerUser$ = (authManService.registerUser as jest.Mock).mockReturnValue(of(errorResponse));;
    jest.spyOn(snackbarManService, "showNotificationMessage");

    //trigger run 
    component.onSignUp();

    expect(registerUser$).toHaveBeenCalled();
    expect(snackbarManService.showNotificationMessage).toHaveBeenCalledWith(errorResponse.message, "snackbar-danger");
  })

  it('should handle server down error', () => {
    component.signupForm.setValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      userName: 'testuser',
      password: 'password',
      confirmPassword: 'password',
    });

    const serverError = throwError('Server Error!!');
    const registerUser$ = (authManService.registerUser as jest.Mock).mockReturnValue(serverError);;
    jest.spyOn(snackbarManService, "showNotificationMessage");

    component.onSignUp();

    expect(registerUser$).toHaveBeenCalled();
    expect(snackbarManService.showNotificationMessage).toHaveBeenCalledWith("Server Error!!", "snackbar-danger");


  })
  
});
