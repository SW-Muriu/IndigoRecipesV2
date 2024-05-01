import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecipeComponent } from './manage-recipe.component';
import { SharedModule } from '../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeService } from '../services/recipe.service';
import { NotificationService } from '../../architecture/services/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Expansion } from '@angular/compiler';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  //Custome Matchers


  beforeEach(async () => {

    mockActivatedRoute = {
      queryParams: new BehaviorSubject({
        data: {
          id: 1
        }
      })

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

  it('should create recipeDetailsForm with the listed keys', () => {
    component.initEmptyRecipeDetailsForm();

    //Check if form is created
    expect(component.recipeDetailsForm).toBeTruthy();

    //Cast to FormGroup
    const formGroup = component.recipeDetailsForm as FormGroup;

    //Assert Controls and existence of validations
    expect(formGroup.get('title')).toBeTruthy();
    expect(formGroup.get('description')).toBeTruthy();
    expect(formGroup.get('yield')).toBeTruthy();
    expect(formGroup.get('prepTime')).toBeTruthy();
    expect(formGroup.get('cookTime')).toBeTruthy();
    expect(formGroup.get('place')).toBeTruthy();
    expect(formGroup.get('time')).toBeTruthy();
    expect(formGroup.get('totalTime')).toBeTruthy();
    expect(formGroup.get('ingredients')).toBeTruthy();
    expect(formGroup.get('instructions')).toBeTruthy();
    expect(formGroup.get('tips')).toBeTruthy();
  }); 


  it('recipeDetails is initialized with empty values', () => {
    component.initEmptyRecipeDetailsForm();
    let emptyArray: any[] = [];

    //Cast to FormGroup
    const formGroup = component.recipeDetailsForm as FormGroup;

    expect(formGroup.get('title')?.value).toBe('');
    expect(formGroup.get('description')?.value).toBe('');
    expect(formGroup.get('yield')?.value).toBe('');
    expect(formGroup.get('prepTime')?.value).toBe('');
    expect(formGroup.get('cookTime')?.value).toBe('');
    expect(formGroup.get('place')?.value).toBe('');
    expect(formGroup.get('time')?.value).toBe('');
    expect(formGroup.get('totalTime')?.value).toBe('');
    expect(formGroup.get('ingredients')?.value).toEqual(emptyArray);
    expect(formGroup.get('instructions')?.value).toEqual(emptyArray);
    expect(formGroup.get('tips')?.value).toEqual(emptyArray);
  })


  it('should return empty array when ingredientsForm.ingredients is not a FormArray', () => {
    // Case 1: ingredientsForm.ingredients is undefined
    // component.ingredientsForm = null; // Set ingredientsForm to undefined
    expect(component.ingredientControls).toEqual([]); // Expect empty array
  });

  // it('should return empty array when ingredientsForm.ingredients is not a FormArray', () => {
  //   // Case 2: ingredientsForm.ingredients is a FormGroup (wrong type)
  //   component.ingredientsForm = fb.group({ someControl: [''] }); // Set ingredientsForm to a FormGroup

  //   expect(component.ingredientControls).toEqual([]); // Expect empty array
  // });

  it('should return the controls as FormControl[] when ingredientsForm.ingredients is a FormArray', () => {
    // Case 3: ingredientsForm.ingredients is a FormArray with controls
    const ingredientControls = fb.array([fb.control(''), fb.control('')]);
    component.ingredientsForm = fb.group({ ingredients: ingredientControls });

    expect(component.ingredientControls).toEqual(ingredientControls.controls); // Expect the actual controls
  });

  /*****************Instructions Form */
  it('should return empty array when instructionsForm.instructions is not a FormArray', () => {
    // Case 1: ingredientsForm.ingredients is undefined
  
    expect(component.instructionControls).toEqual([]); 
  });

  it('should return the controls as FormControl[] when instructionsForm.instructions is a FormArray', () => {
    // Case 3: ingredientsForm.ingredients is a FormArray with controls
    const instructionControls = fb.array([fb.control(''), fb.control('')]);
    component.instructionsForm = fb.group({ instructions: instructionControls });

    expect(component.instructionControls).toEqual(instructionControls.controls); // Expect the actual controls
  });



  /*****************Tips Form */
  it('should return empty array when tipsForm.tips is not a FormArray', () => {
    // Case 1: ingredientsForm.ingredients is undefined

    expect(component.tipsControls).toEqual([]);
  });

  it('should return the controls as FormControl[] when tipsForm.tips is a FormArray', () => {
    // Case 3: ingredientsForm.ingredients is a FormArray with controls
    const tipsControls = fb.array([fb.control(''), fb.control('')]);
    component.tipsForm = fb.group({ tips: tipsControls });

    expect(component.tipsControls).toEqual(tipsControls.controls); // Expect the actual controls
  });

});
