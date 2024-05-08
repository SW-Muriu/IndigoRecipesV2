import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeviewerComponent } from './recipeviewer.component';
import { SharedModule } from '../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../architecture/services/notification/notification.service';
import { BehaviorSubject, of } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { singleSampleRecipe } from '../../architecture/utils/interfaces';

describe('RecipeviewerComponent', () => {
  let component: RecipeviewerComponent;
  let fixture: ComponentFixture<RecipeviewerComponent>;
  let recipeManServiceMock: RecipeService;
  let routeMock: ActivatedRoute;
  let routerMock: Router;
  let snackbarMock: NotificationService;

  const successfulResponse = {
    statusCode: 200,
    message: "Response Successful",
    entity: singleSampleRecipe
  };

  const errorResponse = {
    statusCode: 400,
    message: "Error Response Successful",
    entity: []
  };

  beforeEach(async () => {

    //Mock Acitvated Router data
    const mockQueryParams = {
      queryParams: new BehaviorSubject({
        id: 1
      })
    }

    await TestBed.configureTestingModule({
      imports: [RecipeviewerComponent, SharedModule, BrowserAnimationsModule],
      providers: [
        {
          provide: RecipeService,
          useValue: {
            favoriteRecipe: jest.fn(),
            deleteRecipe: jest.fn(),
            updateRecipe: jest.fn(),
            searchRecipeById: jest.fn()
          }
        },
        {
          provide: NotificationService,
          useValue: {
            showNotificationMessage: jest.fn(),
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn()
          }
        },
        {
          provide: ActivatedRoute,
          useValue: mockQueryParams
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecipeviewerComponent);
    recipeManServiceMock = TestBed.inject(RecipeService);
    // routeMock = TestBed.inject(ActivatedRoute);
    routerMock = TestBed.inject(Router);
    snackbarMock = TestBed.inject(NotificationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    const spy = jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

  it('should complete the destory$ subject on ngOnDestroy', () => {
    const jestSpy = jest.spyOn(component, 'ngOnDestroy');
    jest.spyOn(component.destroy$, 'next');
    jest.spyOn(component.destroy$, 'complete');

    //Trigger run 
    component.ngOnDestroy();

    expect(jestSpy).toHaveBeenCalled();
    expect(component.destroy$.next).toHaveBeenCalledWith(true);
    expect(component.destroy$.complete).toHaveBeenCalled();
  });

  it('should call searchResicipeById in recipeManService and handle successful response', () => {
    const recipeId: number = 1;
    const searchRecipeById = recipeManServiceMock.searchRecipeById as jest.Mock;
    searchRecipeById.mockReturnValue(of(successfulResponse));

    component.searchRecipeById(recipeId);

    expect(recipeManServiceMock.searchRecipeById).toHaveBeenCalledWith(new HttpParams().set("id", recipeId));
    expect(component.recipe).toEqual(successfulResponse.entity)
  }); 

  it('should handle the non-200 response', () => {
    const recipeId: number = 1;
    const searchRecipeById$ = recipeManServiceMock.searchRecipeById as jest.Mock;
    searchRecipeById$.mockReturnValue(of(errorResponse));

    component.searchRecipeById(recipeId);

    expect(recipeManServiceMock.searchRecipeById).toHaveBeenCalledWith(new HttpParams().set("id", recipeId));
    expect(component.recipe).toBeUndefined();
  }); 

  it('should call searchRecipeById on recipeManService, set recipe, and show edit/delete if it belongs to the user', () => {
    const recipeId: number = 1;
    const searchRecipeById$ = recipeManServiceMock.searchRecipeById as jest.Mock;
    searchRecipeById$.mockReturnValue(of(successfulResponse));

    //Expected username is junior, so test its truthiness by setting username as that
    component.username = 'junior';
    component.searchRecipeById(recipeId);

    expect(recipeManServiceMock.searchRecipeById).toHaveBeenCalledWith(new HttpParams().set("id", recipeId));
    expect(component.recipe).toEqual(successfulResponse.entity)
    expect(component.hideEditDelete).toBeTruthy();
  });

  it('should call searchRecipeById on recipeManService, set recipe, and hide edit/delete if it belongs to the user', () => {
    const recipeId: number = 1;
    const searchRecipeById$ = recipeManServiceMock.searchRecipeById as jest.Mock;
    searchRecipeById$.mockReturnValue(of(successfulResponse));

    //Expected username is junior, so test its falsiness by setting username as not that
    component.username = 'testUser';
    component.searchRecipeById(recipeId);

    expect(recipeManServiceMock.searchRecipeById).toHaveBeenCalledWith(new HttpParams().set("id", recipeId));
    expect(component.recipe).toEqual(successfulResponse.entity)
    expect(component.hideEditDelete).toBeFalsy();  
  });

  it('should call favoriteRecipe and handle successful response', () => {
    const id: number = 1;
    const favoriteRecipe$ = recipeManServiceMock.favoriteRecipe as jest.Mock;
    favoriteRecipe$.mockReturnValue(of(successfulResponse));

    component.saveClicked(id);

    expect(favoriteRecipe$).toHaveBeenCalledWith(new HttpParams().set("id", id));
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith(successfulResponse.message, "snackbar-success");
  }); 

  it('should call favoriteRecipe and handle non-200 response', () => {
    const id: number = 1;
    const favoriteRecipe$ = recipeManServiceMock.favoriteRecipe as jest.Mock;
    favoriteRecipe$.mockReturnValue(of(errorResponse));

    component.saveClicked(id);

    expect(favoriteRecipe$).toHaveBeenCalledWith(new HttpParams().set("id", id));
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith(errorResponse.message, "snackbar-danger");
  });

  it('should call editclicked and navigate to the given route', () => {
    const route = [`/manage/recipe`];
    const recipeId: number = 1;
    jest.spyOn(routerMock, 'navigate');
    const expectedParams = { data: JSON.stringify(recipeId) }

    //Trigger run 
    component.editClicked(recipeId);

    expect(routerMock.navigate).toHaveBeenCalledWith(route, { queryParams: expectedParams });
  });

  it('should call deleteRecipe on recipeManService and handle a 200 response (succesful response)', () => {
    const recipe = singleSampleRecipe;
    const route = `/recipes/viewer`;
    const deleteRecipe$ = recipeManServiceMock.deleteRecipe as jest.Mock;
    deleteRecipe$.mockReturnValue(of(successfulResponse));

    component.deleteClicked(recipe);

    expect(deleteRecipe$).toHaveBeenCalledWith(recipe);
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith(successfulResponse.message, "snackbar-success");
    expect(routerMock.navigate).toHaveBeenCalledWith([route])//Navigates back on complete
  }); 

  it('should call deleteRecipe on recipeManService and handle a non-200 response (unsuccessful response)', () => {
    const recipe = singleSampleRecipe;
    const deleteRecipe$ = recipeManServiceMock.deleteRecipe as jest.Mock;
    deleteRecipe$.mockReturnValue(of(errorResponse));

    component.deleteClicked(recipe);

    expect(deleteRecipe$).toHaveBeenCalledWith(recipe);
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith(errorResponse.message, "snackbar-danger");
    expect(routerMock.navigate).toHaveBeenCalledTimes(0) //Dont Navigate if there is an update error back on complete
  })
})
