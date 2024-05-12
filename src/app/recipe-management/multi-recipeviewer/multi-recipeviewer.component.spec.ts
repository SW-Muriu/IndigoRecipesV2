import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { MultiRecipeviewerComponent } from './multi-recipeviewer.component';
import { SharedModule } from '../../architecture/modules/shared.module';
import { Router } from '@angular/router';
import { NotificationService } from '../../architecture/services/notification/notification.service';
import { RecipeService } from '../services/recipe.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { sampledRecipes } from '../../architecture/utils/interfaces';

describe('MultiRecipeviewerComponent', () => {
  let component: MultiRecipeviewerComponent;
  let fixture: ComponentFixture<MultiRecipeviewerComponent>;
  let routerMock: Router;
  let snackbarMock: NotificationService;
  let recipeManServiceMock: RecipeService;



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


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiRecipeviewerComponent, SharedModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [{
        provide: RecipeService, useValue: {
          fetchAllRecipes: jest.fn(),
          fetchFavRecipes: jest.fn(),
          fetchMyRecipes: jest.fn(),
        }
      },
      {
        provide: routerMock, useValue: {
          navigate: jest.fn()
        }
      },
      {
        provide: NotificationService, useValue: {
          showNotificationMessage: jest.fn(),
          shouldDeferContent: true,
        }
      }
      ]

    })
      .compileComponents();
    routerMock = TestBed.inject(Router);
    recipeManServiceMock = TestBed.inject(RecipeService);
    snackbarMock = TestBed.inject(NotificationService);
   
    fixture = TestBed.createComponent(MultiRecipeviewerComponent);
    component = fixture.componentInstance;
    (recipeManServiceMock.fetchAllRecipes as jest.Mock).mockReturnValue(of(null));
    (recipeManServiceMock.fetchFavRecipes as jest.Mock).mockReturnValue(of(null));
    (recipeManServiceMock.fetchMyRecipes as jest.Mock).mockReturnValue(of(null));
    fixture.detectChanges();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  
  it('should call ngOnInit', () => {
    const jestSpy = jest.spyOn(component, "ngOnInit");
    // recipeManServiceMock.shouldDeferContent = true;

    //Trigger
    component.ngOnInit();

    //Assert
    expect(jestSpy).toHaveBeenCalledWith();
    // expect(component.shouldDeferContent).toBe(true);
  })

  it('should complete the destroy$ subject on ngOnDestroy', () => {
    const jestSpy = jest.spyOn(component, "ngOnDestroy");
    jest.spyOn(component.destroy$, "next");
    jest.spyOn(component.destroy$, "complete");

    // trigger
    component.ngOnDestroy();

    //Assert
    expect(jestSpy).toHaveBeenCalled();
    expect(component.destroy$.next).toHaveBeenCalledWith(true);
    expect(component.destroy$.complete).toHaveBeenCalled();
  });


  it('should navigate to set route on addRecipe call', () => {
    let mockRoute = `manage/recipe`;
    jest.spyOn(component, "addRecipe");
    const jestSpy = jest.spyOn(routerMock, "navigate");

    //Trigger 
    component.addRecipe();

    //Assert
    expect(jestSpy).toHaveBeenCalledWith([mockRoute]);
  });

  it('should call getAllRecipes and handle successful response (200)', () => {
    const fetchAllRecipes$ = recipeManServiceMock.fetchAllRecipes as jest.Mock;
    fetchAllRecipes$.mockReturnValue(of(successfulResponse));

    //Trigger 
    component.getAllRecipes();

    expect(fetchAllRecipes$).toHaveBeenCalled();
    expect(component.recipes).toEqual(successfulResponse.entity);
  });

  it('should call getAllRecipes and handle unsuccessful response (not 200)', () => {
    const fetchAllRecipes$ = recipeManServiceMock.fetchAllRecipes as jest.Mock;
    fetchAllRecipes$.mockReturnValue(of(errorResponse));
    //Trigger run
    component.getAllRecipes();

    expect(fetchAllRecipes$).toHaveBeenCalled();
    expect(component.recipes).toEqual([])//remains empty
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith(errorResponse.message, "snackbar-danger");
  });

  it('should call getAllRecipes and handle error response', () => {
    const errorResponse = new Error();
    const fetchAllRecipes$ = recipeManServiceMock.fetchAllRecipes as jest.Mock;
    fetchAllRecipes$.mockReturnValue(of(errorResponse));

    //Trigger run
    component.getAllRecipes();

    expect(fetchAllRecipes$).toHaveBeenCalled();
    expect(component.recipes).toEqual([])//remains empty
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith("", "snackbar-danger");
  });

  /*****Get My Recipes */
  it('should call fetchMyRecipes and handle successful response (200)', () => {
    jest.spyOn(recipeManServiceMock, 'fetchMyRecipes').mockReturnValue(of(successfulResponse));
    // const fetchMyRecipes$ = recipeManServiceMock.fetchMyRecipes as jest.Mock;
    // fetchMyRecipes$.mockReturnValue(of(successfulResponse));

    //Trigger 
    component.getMyRecipes();

    expect(recipeManServiceMock.fetchMyRecipes).toHaveBeenCalled();
    // expect(recipeManServiceMock.)
    // expect(component.recipes).toEqual(successfulResponse.entity);
  });

  it('should call fetchMyRecipes and handle unsuccessful response (not 200)', () => {
    const fetchMyRecipes$ = recipeManServiceMock.fetchMyRecipes as jest.Mock;
    fetchMyRecipes$.mockReturnValue(of(errorResponse));
    //Trigger run
    component.getMyRecipes();

    expect(fetchMyRecipes$).toHaveBeenCalled();
    expect(component.recipes).toEqual([])//remains empty
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith(errorResponse.message, "snackbar-danger");
  });

  it('should call fetchMyRecipes and handle error response', () => {
    const errorResponse = new Error();
    const fetchMyRecipes$ = recipeManServiceMock.fetchMyRecipes as jest.Mock;
    fetchMyRecipes$.mockReturnValue(of(errorResponse));

    //Trigger run
    component.getMyRecipes();

    expect(fetchMyRecipes$).toHaveBeenCalled();
    expect(component.recipes).toEqual([])//remains empty
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith("", "snackbar-danger");
  });

  /*****Get Saved Recipes */
  it('should call fetchFavRecipes and handle successful response (200)', () => {
    const fetchFavRecipes$ = recipeManServiceMock.fetchFavRecipes as jest.Mock;
    fetchFavRecipes$.mockReturnValue(of(successfulResponse));

    //Trigger 
    component.getSavedRecipes();

    expect(fetchFavRecipes$).toHaveBeenCalled();
    expect(component.recipes).toEqual(successfulResponse.entity);
  });

  it('should call fetchFavRecipes and handle unsuccessful response (not 200)', () => {
    const fetchFavRecipes$ = recipeManServiceMock.fetchFavRecipes as jest.Mock;
    fetchFavRecipes$.mockReturnValue(of(errorResponse));
    //Trigger run
    component.getSavedRecipes();

    expect(fetchFavRecipes$).toHaveBeenCalled();
    expect(component.recipes).toEqual([])//remains empty
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith(errorResponse.message, "snackbar-danger");
  });

  it('should call fetchFavRecipes and handle error response', () => {
    const errorResponse = new Error();
    const fetchFavRecipes$ = recipeManServiceMock.fetchFavRecipes as jest.Mock;
    fetchFavRecipes$.mockReturnValue(of(errorResponse));

    //Trigger run
    component.getSavedRecipes();

    expect(fetchFavRecipes$).toHaveBeenCalled();
    expect(component.recipes).toEqual([])//remains empty
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith("", "snackbar-danger");
  });

  /*****************Searching through the recipes */
  it('should return all recipes if search value is empty', () => {
    const searchValue = '';
    const filteredRecipes = component.searchThroughRecipes(sampledRecipes, searchValue);
    expect(filteredRecipes).toEqual(sampledRecipes);
  })

  it('should return recipes mathcing the search value(case sensitive) ', () => {
    const searchValue1 = 'Matumbo';
    const returnValue = component.searchThroughRecipes(sampledRecipes, searchValue1);
    expect(returnValue.length).toBe(1);
  });

  it('should return recipes mathcing the search value(case insensitive) ', () => {
    const searchValue1 = 'matumbo';
    const returnValue = component.searchThroughRecipes(sampledRecipes, searchValue1);
    expect(returnValue.length).toBe(1);
  }); 

  it('should search using place, owner or time', () => {
    const placeValue = 'Tetu'
    const timeValue = 'Brunches'
    const titleValue = 'Matumbo'

    const returnByPlace = component.searchThroughRecipes(sampledRecipes, placeValue);
    const returnByTime = component.searchThroughRecipes(sampledRecipes, timeValue);
    const returnByTitle = component.searchThroughRecipes(sampledRecipes, titleValue);

    //Assert
    expect(returnByPlace.length).toBe(1);
    expect(returnByTime.length).toBe(1);
    expect(returnByTitle.length).toBe(1);
  });

  it('should call population functions on onSearch', () => {
    jest.spyOn(component, 'searchThroughRecipes');

    const searchValue: string = '' //empty string

    // trigger run
    component.onSearch(searchValue);
    
    expect(component.searchThroughRecipes).toHaveBeenCalledTimes(3);
  }); 

  // it('should recall the initial values of all arrays onClearSearch call', () => {
  //   jest.spyOn(component, 'onClearSearch');

  //   const testEvent: string = ''
  //   //Trigger run
  //   component.onClearSearch(testEvent);

  //   expect(component.getAllRecipes).toHaveBeenCalledWith(1);
  //   expect(component.getMyRecipes).toHaveBeenCalledWith(1);
  //   expect(component.getSavedRecipes).toHaveBeenCalledWith(1);
  // })

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

});
