import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecipeComponent } from './manage-recipe.component';
import { SharedModule } from '../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeService } from '../services/recipe.service';
import { NotificationService } from '../../architecture/services/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Expansion } from '@angular/compiler';
import { FormBuilder, FormGroup } from '@angular/forms';

describe('ManageRecipeComponent', () => {
  let component: ManageRecipeComponent;
  let fixture: ComponentFixture<ManageRecipeComponent>;
  let recipeServiceMock: RecipeService;
  let snackbarMock: NotificationService;
  let routerMock: Router;
  // let routeMock: ActivatedRoute;
  let fb: FormBuilder;
  let spyInstance: jest.SpyInstance;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    
    mockActivatedRoute = {
      queryParams: new BehaviorSubject({
        data: {
        id: 1
      }})
      
    }
    await TestBed.configureTestingModule({
      imports: [ManageRecipeComponent, SharedModule, BrowserAnimationsModule], 
      providers: [{
        provide: ActivatedRoute, useValue: mockActivatedRoute
      }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageRecipeComponent);
    recipeServiceMock = TestBed.inject(RecipeService);
    snackbarMock = TestBed.inject(NotificationService);
    routerMock = TestBed.inject(Router);
    fb = TestBed.inject(FormBuilder);
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

  it('should create recipeDetailsForm with expected controls and validations', () => {
    component.initEmptyRecipeDetailsForm();

    //Check if form is created
    expect(component.recipeDetailsForm).toBeTruthy();

    //Cast to FormGroup
    const formGroup = component.recipeDetailsForm as FormGroup;

    //Assert Controls and existence of validations
    expect(formGroup.get('title')).toBeTruthy();
    // expect(formGroup.get())

  })

});
