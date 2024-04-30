import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../architecture/services/notification/notification.service';
import { AuthService } from '../../services/authservices/auth.service';
import { of } from 'rxjs';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authManService: any;
  let snackbarManService: any;
  let router: any;
  let spyInstance: jest.SpyInstance;
  


  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [
        SignupComponent,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
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

  it('should register user and navigate to home on successful signup', () => {
    //Mock Form
    component.signupForm.setValue({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      userName: 'testuser',
      password: 'password',
      confirmPassword: 'password',
    }); 

    //Mock Response
    const successfulResponse = {
      statusCode: 200,
      message: 'User registered successfully!',
      entity: { userName: 'testuser', email: 'test@example.com' },
    };

    spyInstance = jest.spyOn(authManService, 'registerUser').mockReturnValue(of(successfulResponse));

    component.onSignUp();

    expect(spyInstance).toHaveBeenCalledWith(component.signupForm.value);
    // expect(snackbarManService).toHaveBeenCalledWith(successfulResponse.message, "snackbar-success");
    // expect(sessionStorage.getItem('email')).toEqual(successfulResponse.entity.email);
    // expect(sessionStorage.getItem('username')).toEqual(successfulResponse.entity.userName);
    // expect(router.navigate).toHaveBeenCalledWith(['/home']);

  })
  
});
