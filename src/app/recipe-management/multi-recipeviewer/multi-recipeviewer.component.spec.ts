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
  let recipeService: RecipeService;
  let recipeManServiceMock: jest.SpyInstance;

  const mockRouter = {
    navigate: jest.fn()
  }





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
      imports: [MultiRecipeviewerComponent, SharedModule, BrowserAnimationsModule],
      providers: [{
        provide: Router,
        useValue: mockRouter
      }]

    })
      .compileComponents();
    recipeService = TestBed.inject(RecipeService);
    fixture = TestBed.createComponent(MultiRecipeviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should', () => {
    jest.spyOn(mockRouter, 'navigate');
    component.addRecipe()
    expect(mockRouter.navigate).toHaveBeenCalledWith([`manage/recipe`]);
  });

  it('should call fetchAllRecipes on 200', () => {
    recipeManServiceMock = jest.spyOn(recipeService, 'fetchAllRecipes').mockReturnValue(of(successfulResponse));

    //Trigger
    component.getAllRecipes();

    expect(recipeManServiceMock).toHaveBeenCalled();

  })


});
