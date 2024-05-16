import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileManagementComponent } from './profile-management.component';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/authservices/auth.service';
import { NotificationService } from '../../../architecture/services/notification/notification.service';
import { of } from 'rxjs';
import { User } from '../../../architecture/utils/interfaces';
import { Router } from '@angular/router';
import { DeclareVarStmt } from '@angular/compiler';

describe('ProfileManagementComponent', () => {
  let component: ProfileManagementComponent;
  let fixture: ComponentFixture<ProfileManagementComponent>;
  let mockProfileService: AuthService;
  let notificationManMock: NotificationService;
  let routerMock: Router;

  const successfulResponse = {
    statusCode: 200,
    message: "Response Successful",
    entity: []
  };

  const errorResponse = {
    statusCode: 400,
    message: "Error Response Successful",
    entity: []
  };

  const serverError = {
    statusCode: 500,
    message: "Server Error!!",
    entity: []
  }

  const userData: User = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    username: 'Johndoe',
    password: '123456',
    confirmPassword: '123456',
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileManagementComponent, SharedModule, BrowserAnimationsModule],
      providers: [
        {
          provide: AuthService, useValue: {
            updateUser: jest.fn()
          }
        },
        {
          provide: Router, useValue: {
            navigate: jest.fn()
          }
        },
        {
          provide: NotificationService, useValue: {
            showNotificationMessage: jest.fn()
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileManagementComponent);
    notificationManMock = TestBed.inject(NotificationService);
    mockProfileService = TestBed.inject(AuthService);
    routerMock = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should comlete the destroy$ subject on ngOnDestroy', () => {
    const jestSpy = jest.spyOn(component, "ngOnDestroy");
    jest.spyOn(component.destroy$, "next");
    jest.spyOn(component.destroy$, "complete");

    //Trigger the function 
    component.ngOnDestroy();

    expect(jestSpy).toHaveBeenCalled;
    expect(component.destroy$.next).toHaveBeenCalledWith(true);
    expect(component.destroy$.complete).toHaveBeenCalledWith();
  });



  it('should call handleProfileUpdate and handle successful response', () => {
    const updateUser$ = mockProfileService.updateUser as jest.Mock
    component.profileForm.setValue(userData);
    updateUser$.mockReturnValue(of(successfulResponse));

    //Trigger Function
    component.handleProfileUpdate();

    //Assertion
    expect(updateUser$).toHaveBeenLastCalledWith(userData);
    expect(notificationManMock.showNotificationMessage).toHaveBeenCalledWith(successfulResponse.message, "snackbar-success");
    expect(routerMock.navigate).toHaveBeenCalledWith(["/home"]);
  });

  it('should call updateUser on authManService and handle unexpected response (not 200)', () => {
    const updateUser$ = mockProfileService.updateUser as jest.Mock
    component.profileForm.setValue(userData);
    updateUser$.mockReturnValue(of(errorResponse));

    //Trigger Function
    component.handleProfileUpdate();

    //Assertion
    expect(updateUser$).toHaveBeenLastCalledWith(userData);
    expect(notificationManMock.showNotificationMessage).toHaveBeenCalledWith(errorResponse.message, "snackbar-danger");
  });

  it('should call updateUser on authManService and handle error response', () => {
    const updateUser$ = mockProfileService.updateUser as jest.Mock
    const errorResponse = new Error();
    component.profileForm.setValue(userData);
    updateUser$.mockReturnValue(of(errorResponse));

    //Trigger Function
    component.handleProfileUpdate();
    

    //Assertion
    expect(updateUser$).toHaveBeenLastCalledWith(userData);
    expect(notificationManMock.showNotificationMessage).toHaveBeenCalledWith("", "snackbar-danger");
  });


});
