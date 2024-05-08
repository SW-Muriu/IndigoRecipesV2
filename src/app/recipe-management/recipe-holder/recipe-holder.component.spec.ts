import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeHolderComponent } from './recipe-holder.component';
import { NotificationService } from '../../architecture/services/notification/notification.service';
import { Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { SharedModule } from '../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HttpParams } from '@angular/common/http';

describe('RecipeHolderComponent', () => {
  let component: RecipeHolderComponent;
  let fixture: ComponentFixture<RecipeHolderComponent>;
  let snackbarMock: NotificationService;
  let routerMock: Router;
  let recipeManServiceMock: RecipeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeHolderComponent, SharedModule, BrowserAnimationsModule],
      providers: [
        {
          provide: NotificationService, 
          useValue: {
            showNotificationMessage: jest.fn(),
          }
        }, 
        {
          provide: Router, 
          useValue: {
            navigate: jest.fn(),
          }
        },
        {
          provide: RecipeService, 
          useValue: {
            favoriteRecipe: jest.fn(),
          }
        }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeHolderComponent);
    snackbarMock = TestBed.inject(NotificationService);
    routerMock = TestBed.inject(Router);
    recipeManServiceMock = TestBed.inject(RecipeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should complete the destroy$ subject on ngOnDestroy ', () => {
    jest.spyOn(component, 'ngOnDestroy');
    jest.spyOn(component.destroy$, 'next');
    jest.spyOn(component.destroy$, 'complete');

    //Trigger 
    component.ngOnDestroy();

    // Assertion
    expect(component.destroy$.next).toHaveBeenCalledWith(true);
    expect(component.destroy$.complete).toHaveBeenCalled();
  });

  it('should navigate to given path with the expectedParaams', () => {
    //Setup
    const id: number = 1;
    const expectedParaams = {
      id: id
    };
    const expectedRoute = `/recipe/viewer`;

    component.onViewMore(id);

    expect(routerMock.navigate).toHaveBeenCalledWith([expectedRoute], { queryParams: expectedParaams });
  }); 

  it('should call favoriteRecipe in RecipeService and handle successful response(200)', () => {
    const id: number = 1;
    const successfulResponse = {
      statusCode: 200,
      message: '',
      entity: {}
    }
    const favoriteRecipe$ = recipeManServiceMock.favoriteRecipe as jest.Mock;
    favoriteRecipe$.mockReturnValue(of(successfulResponse)); 

    component.onLike(id);

    expect(recipeManServiceMock.favoriteRecipe).toHaveBeenCalledWith(new HttpParams().set("id", id));
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith(successfulResponse.message, "snackbar-success");
  }); 

  it('should call favoriteRecipe on Recipe Service and handle errorResponse (not 200)', () => {
    const id: number = 1;
    const errorResponse = {
      statusCode: 2300,
      message: '',
      entity: {}
    };
    const favoriteRecipe$ = recipeManServiceMock.favoriteRecipe as jest.Mock;
    favoriteRecipe$.mockReturnValue(of(errorResponse));

    //Trigger run
    component.onLike(id);

    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith(errorResponse.message, "snackbar-danger");
  }); 

  afterEach(() => {
    jest.clearAllMocks()
  })

});
