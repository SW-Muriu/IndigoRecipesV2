import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeviewerComponent } from './recipeviewer.component';
import { SharedModule } from '../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../architecture/services/notification/notification.service';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { sampledRecipes, singleSampleRecipe } from '../../architecture/utils/interfaces';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

describe('RecipeviewerComponent', () => {
  let component: RecipeviewerComponent;
  let fixture: ComponentFixture<RecipeviewerComponent>;
  let recipeManServiceMock: RecipeService;
  let routerMock: Router;
  let snackbarMock: NotificationService;
  let locationMock: Location;

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
        }, 
        {
          provide: Location,
          useValue: {
            back: jest.fn()
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecipeviewerComponent);
    recipeManServiceMock = TestBed.inject(RecipeService);
    // routeMock = TestBed.inject(ActivatedRoute);
    routerMock = TestBed.inject(Router);
    snackbarMock = TestBed.inject(NotificationService);
    locationMock = TestBed.inject(Location);
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
  });


  it('should call Shareclicked with correct properties for Swal Spy', () => {

    const title = `Test Recipe`;
    let swalFireSpy = jest.spyOn(Swal, 'fire');
    component.shareClicked(title);

    expect(swalFireSpy).toHaveBeenCalledWith({
      title: 'Share via',
      showCancelButton: true,
      confirmButtonText: 'Facebook',
      cancelButtonText: 'WhatsApp',
      showCloseButton: true,
      html: `You can also <a href="mailto:?subject=Check out this article&amp;body=https://example.com/share?title=${encodeURIComponent(title)}">Email</a> it.`,
      reverseButtons: true,
    });
  }); 

  it('should not add comment if the comment field is null', () => {
    component.newComment = "";
    component.username = "Junior";
    component.recipe = singleSampleRecipe;
    (recipeManServiceMock.updateRecipe as jest.Mock).mockReturnValue(throwError("Server Error!!"));

    component.addComment();
    expect(component.recipe.comments.length).toBe(1);
  }); 

  it('should call updateRecipe and handle successful response (200)', () => {
    component.newComment = 'samsicker';
    component.username = "Junior";
    component.recipe = singleSampleRecipe;
    const updateRecipe$ = (recipeManServiceMock.updateRecipe as jest.Mock).mockReturnValue(of(successfulResponse));

    component.addComment();

    expect(updateRecipe$).toHaveBeenCalledWith(singleSampleRecipe);
    expect(component.recipe.comments.length).toBe(2);
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith("Recipe Reviewed Successfully!!", 'snackbar-success');
  }); 

  it('should call updateRecipe and handle unsuccessful response (not 200)', () => {
    component.newComment = 'asdasdadas';
    component.username = "Junior";
    component.recipe = singleSampleRecipe;
    const updateRecipe$ = (recipeManServiceMock.updateRecipe as jest.Mock).mockReturnValue(of(errorResponse));
    component.addComment();
    expect(updateRecipe$).toHaveBeenCalledWith(singleSampleRecipe);
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith("There was a problem reviewing the recipe!!", 'snackbar-danger');
  }); 

  it('should call updateRecipe and handle server down error', () => {
    component.newComment = 'lkjhgfd';
    component.username = "Junior";
    component.recipe = singleSampleRecipe;
    const updateRecipe$ = (recipeManServiceMock.updateRecipe as jest.Mock).mockReturnValue(throwError("Server Error!!"));

    // trigger run
    component.addComment();

    expect(updateRecipe$).toHaveBeenCalledWith(singleSampleRecipe);
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith("Server Error!!", 'snackbar-danger');
  });

  it('should navigate back on call navigateHome', () => {
    jest.spyOn(component, "navigateBackHome");

    component.navigateBackHome();

    expect(locationMock.back).toHaveBeenCalled();
  })



})
