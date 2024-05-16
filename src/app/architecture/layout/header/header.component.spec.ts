import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { SharedModule } from '../../modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../../admin/services/authservices/auth.service';
import { NotificationService } from '../../services/notification/notification.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let authManService: AuthService;
  let snackbar: NotificationService;
  let spyInstance: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, SharedModule, BrowserAnimationsModule],
      providers: [
        { provide: Router, useValue: {navigate: jest.fn()} },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    authManService = TestBed.inject(AuthService);
    snackbar = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const jestSpy = jest.spyOn(component, 'ngOnInit');
    
    //Trigger Function 
    component.ngOnInit();

    expect(jestSpy).toHaveBeenCalled();
  })

  it('should set current username and email from session storage', () => {
    //Simulate logged in user
    sessionStorage.setItem("username", "test_user");
    sessionStorage.setItem("email", "test@example.com");

    //Trigger ngOnInit
    component.ngOnInit();

    //Assert component properties 
    expect(component.currentUserName).toBe('test_user');
    expect(component.currentUserEmail).toBe('test@example.com');
  }); 

  it('should set current username and currentuserEmial to empty strings if not found in session storage', () => {
    //Clear session storage 
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');

    //Call ngOnInit to trigger initialization
    component.ngOnInit();

    //Assert component properties are empty strings
    expect(component.currentUserName).toBe(null);
    expect(component.currentUserEmail).toBe(null);
  });


  it('should emit the searchTerm on performSearch call', () => {
    spyInstance = jest.spyOn(component.searchValue, 'emit');
    const searchTerm = "test search";
    component.searchTerm = searchTerm;

    component.performSearch();

    expect(spyInstance).toHaveBeenCalledWith(searchTerm);
  }); 

  it('should emit an event on clearSearch call', () => {
    spyInstance = jest.spyOn(component.clearSearch, 'emit');

    component.clearSearchTerm();

    expect(spyInstance).toHaveBeenCalled();

  }); 

  it('should navigate to manage/recipe route on addRecipe call', () => {
    const expectedRoute = ['/manage/recipe'];

    component.addRecipe();

    expect(router.navigate).toHaveBeenCalledWith(expectedRoute);
  });

  it('should navigate to home on navigateToHome call', () => {
    const expectedRoute = ["/home"];

    component.navigateToHome();

    expect(router.navigate).toHaveBeenCalledWith(expectedRoute);
  });

  it('should navigate to /profile route on updateProfile call', () => {
    const expectedRoute = ["/profile"];

    component.updateProfile();

    expect(router.navigate).toHaveBeenCalledWith(expectedRoute);
  });

  it('should clear session storage and navigate to /# route on onLogout call', () => {
    const expectedRoute = ["/#"];

    //Trigger function
    component.onLogout();

    //Assert session storage is cleared
    expect(sessionStorage.length).toBe(0);

    //Assert navigation to expected route
    expect(router.navigate).toHaveBeenCalledWith(expectedRoute);
  });

});


