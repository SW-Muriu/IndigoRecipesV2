import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { SharedModule } from '../../modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification/notification.service';
import { RecipeService } from '../../../recipe-management/services/recipe.service';
import { of, throwError } from 'rxjs';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let routerMock: Router;
  let snackbarMock: NotificationService;
  let recipeServiceMock: RecipeService;
  let spyInstance: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageComponent, SharedModule, BrowserAnimationsModule], 
      providers: [
      ]
    })
      .compileComponents();

    
    routerMock = TestBed.inject(Router);
    snackbarMock = TestBed.inject(NotificationService);
    recipeServiceMock = TestBed.inject(RecipeService);
    fixture = TestBed.createComponent(HomePageComponent);
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

  it('should call ngOnInit', () => {
    const jestSpy = jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();

    expect(jestSpy).toHaveBeenCalledWith();
  });

  it('should Navigate', () => {
    const navigateSpy = jest.spyOn(routerMock, 'navigate');
    const mockRoute = '/recipes/viewer';
    component.selectCuisine();

    expect(navigateSpy).toHaveBeenCalled();

    //Assert exact route
    expect(navigateSpy).toHaveBeenCalledWith([mockRoute]);
  });

  it('should navigate to the next and previous reviews', () => {
    spyInstance = jest.spyOn(component, 'nextReview');
    component.currentIndex$.update((c) => c + 2);
    component.nextReview();

    expect(spyInstance).toHaveBeenCalled();
    expect(component.currentIndex$()).toBe(3);

  });
  

  it('should navigate to previous index', () => {
    spyInstance = jest.spyOn(component, 'prevReview');
    component.prevReview();

    expect(spyInstance).toHaveBeenCalled();
    expect(component.currentIndex$()).toBe(6);
  });


  
  //GetNewRecipes 
  it('should call fetchNewRecipes and handle successful response (200)', () => {
    const successfulResponse = {
      statusCode: 200,
      message: "Successful Response",
      entity: {},
    }
    spyInstance = jest.spyOn(recipeServiceMock, "fetchNewRecipes");
    spyInstance.mockReturnValue(of(successfulResponse));
    jest.spyOn(snackbarMock, "showNotificationMessage");

    component.getNewRecipes();

    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledTimes(0);
  }); 


  it('should call fetchNewRecipes and handle unsuccessful response (not 200)', () => {
    const errorResponse = {
      statusCode: 300,
      message: "Successful Response",
      entity: {},
    }
    spyInstance = jest.spyOn(recipeServiceMock, "fetchNewRecipes");
    spyInstance.mockReturnValue(of(errorResponse));
    jest.spyOn(snackbarMock, "showNotificationMessage");

    component.getNewRecipes();

    
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith(errorResponse.message, "snackbar-danger");
  }); 


  it('should call fetchNewRecipes and server down error', () => {
    const errorResponse = throwError("Server Error")
    spyInstance = jest.spyOn(recipeServiceMock, "fetchNewRecipes");
    spyInstance.mockReturnValue(errorResponse);
    jest.spyOn(snackbarMock, "showNotificationMessage");

    component.getNewRecipes();


    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith("server-error!!", "snackbar-danger");
  }); 



});
