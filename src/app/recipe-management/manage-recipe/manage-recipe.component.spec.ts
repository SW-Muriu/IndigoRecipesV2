import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecipeComponent } from './manage-recipe.component';
import { SharedModule } from '../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeService } from '../services/recipe.service';
import { NotificationService } from '../../architecture/services/notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Recipe } from '../../architecture/utils/interfaces';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { Expansion } from '@angular/compiler';

describe('ManageRecipeComponent', () => {
  let component: ManageRecipeComponent;
  let fixture: ComponentFixture<ManageRecipeComponent>;
  let recipeServiceMock: RecipeService;
  let snackbarMock: NotificationService;
  let routerMock: Router;
  let fb: FormBuilder;
  let mockActivatedRoute: any;
  let locationMock: Location

  let mockRecipe: Recipe = {
    title: 'Ugali Mayai',
    yield: 4,
    rating: 4,
    prepTime: 20,
    cookTime: 30,
    totalTime: 50,
    description: '',
    id: 1,
    time: "Breakfast",
    imageUrl: './../../../assets/political.png',
    // imageUrl: "https://via.placeholder.com/300", 
    place: "African",
    ingredients: [
      "2 boneless, skinless chicken breasts",
      "1 tablespoon olive oil",
      "1 teaspoon dried oregano",
      "1/2 teaspoon garlic powder",
      "1/4 teaspoon salt",
      "1/4 teaspoon black pepper",
      "1 bunch asparagus, trimmed",
      "1 lemon, sliced",
    ],
    instructions: [
      "Preheat oven to 400°F (200°C). Lightly grease a baking sheet.",
      "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper.",
      "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken.",
      "Top with lemon slices.",
      "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp",
    ],
    tips: [
      "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking.",
      "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers.",
      "Serve with rice or quinoa for a complete meal.",
    ],
    comments: [{
      sender: 'samsicker',
      text: 'This recipe was delicious! I loved the flavor combinations.'
    }],
    owner: 'junior',
    isFavourited: true,
  };


  let successfulResponse = {
    statusCode: 200,
    message: 'Recipe API hit successfully',
    entity: mockRecipe
  };

  let errorResponse = {
    statusCode: 300,
    message: "Something went wrong",
  }


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
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        {
          provide: RecipeService, useValue:
          {
            postNewRecipe: jest.fn(),
            updateRecipe: jest.fn(),
            searchRecipeById: jest.fn(),
          }
        },
        { provide: NotificationService, useValue: { showNotificationMessage: jest.fn() } },
        { provide: Router, useValue: { navigate: jest.fn() } },
        {provide: Location, useValue: {back: jest.fn()}},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ManageRecipeComponent);
    recipeServiceMock = TestBed.inject(RecipeService);
    snackbarMock = TestBed.inject(NotificationService);
    routerMock = TestBed.inject(Router);
    fb = TestBed.inject(FormBuilder);
    locationMock = TestBed.inject(Location);
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

    expect(component.instructionControls).toEqual([]);
  });

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


  /***********Ingredients Form */
  it('should add a new FormControl with required validator to the ingredients FormArray', () => {
    const initialIngredients = fb.array([]); // Empty initial FormArray
    component.ingredientsForm = fb.group({ ingredients: initialIngredients });

    component.addIngredient();

    const ingredientControls = component.ingredientsForm.get('ingredients') as FormArray;
    expect(ingredientControls.length).toBe(1); // Expect one control added

    const newControl = ingredientControls.at(0);
    expect(newControl.value).toBe(''); // Expect initial value to be empty
  });


  it('should remove the control at the specified index from the ingredients FormArray', () => {
    const ingredients = [
      fb.control('Ingredient 1'),
      fb.control('Ingredient 2'),
      fb.control('Ingredient 3'),
    ];
    const ingredientsForm = fb.group({ ingredients: fb.array(ingredients) });

    component.ingredientsForm = ingredientsForm;

    const initialLength = component.ingredientsForm.get('ingredients')?.value.length;

    component.removeIngredient(1); // Remove the second ingredient

    const ingredientControls = component.ingredientsForm.get('ingredients') as FormArray;
    expect(ingredientControls.length).toBe(initialLength - 1); // Expect one less control

    expect(ingredientControls.at(0).value).toBe('Ingredient 1'); // First ingredient remains
    expect(ingredientControls.at(1).value).toBe('Ingredient 3'); // Third ingredient moved up
  });


  /**********Instructions Form CRUD */
  it('should add a new FormControl with required validator to the instructions FormArray', () => {
    const initialIstructions = fb.array([]); // Empty initial FormArray
    component.instructionsForm = fb.group({ instructions: initialIstructions });

    component.addInstruction();

    const instructionControls = component.instructionsForm.get('instructions') as FormArray;
    expect(instructionControls.length).toBe(1); // Expect one control added

    const newControl = initialIstructions.at(0);
    expect(newControl.value).toBe(''); // Expect initial value to be empty
  });


  it('should remove the control at the specified index from the instructions FormArray', () => {
    const instructions = [
      fb.control('instruction 1'),
      fb.control('instruction 2'),
      fb.control('instruction 3'),
    ];
    const instructionsForm = fb.group({ instructions: fb.array(instructions) });

    component.instructionsForm = instructionsForm;

    const initialLength = component.instructionsForm.get('instructions')?.value.length;

    component.removeInstruction(1); // Remove the second tip

    const instructionControls = component.instructionsForm.get('instructions') as FormArray;
    expect(instructionControls.length).toBe(initialLength - 1); // Expect one less control

    expect(instructionControls.at(0).value).toBe('instruction 1'); // First tip remains
    expect(instructionControls.at(1).value).toBe('instruction 3'); // Third tip moved up
  });


  /************Tips Form CRUD */
  it('should add a new FormControl with required validator to the tips FormArray', () => {
    const initialTips = fb.array([]); // Empty initial FormArray
    component.ingredientsForm = fb.group({ tips: initialTips });

    component.addTip();

    const tipControl = component.tipsForm.get('tips') as FormArray;
    expect(tipControl.length).toBe(1); // Expect one control added

    const newControl = tipControl.at(0);
    expect(newControl.value).toBe(''); // Expect initial value to be empty
  });


  it('should remove the control at the specified index from the tips FormArray', () => {
    const tips = [
      fb.control('tip 1'),
      fb.control('tip 2'),
      fb.control('tip 3'),
    ];
    const tipsForm = fb.group({ tips: fb.array(tips) });

    component.tipsForm = tipsForm;

    const initialLength = component.tipsForm.get('tips')?.value.length;

    component.removeTip(1); // Remove the second tip

    const tipsControls = component.tipsForm.get('tips') as FormArray;
    expect(tipsControls.length).toBe(initialLength - 1); // Expect one less control

    expect(tipsControls.at(0).value).toBe('tip 1'); // First tip remains
    expect(tipsControls.at(1).value).toBe('tip 3'); // Third tip moved up
  });


  /***************** Population of forms with data */

  it('should populate ingredient controls with data and validators', () => {
    const ingredientData = [
      'Ingredient 1',
      'Ingredient 2',
    ];
    component.ingredientsData = ingredientData;

    component.populateFormsWithData();

    const ingredientControls = component.ingredientControls as unknown as FormArray;
    expect(ingredientControls.length).toBe(ingredientData.length); // Expect all data added

    ingredientControls.controls?.forEach((control, index) => {
      expect(control.value).toEqual(ingredientData[index]); // Expect data populated correctly
      expect(control.validator).toBeTruthy(); // Expect validator to be set
    });
  });

  it('should populate instructions controls with data and validators', () => {
    const instructionsData = [
      'Instruction 1',
      'Instruction 2',
    ];
    component.instructionsData = instructionsData;

    component.populateFormsWithData();

    const instructionControls = component.ingredientControls as unknown as FormArray;
    expect(instructionControls.length).toBe(instructionsData.length); // Expect all data added

    instructionControls.controls?.forEach((control, index) => {
      expect(control.value).toEqual(instructionsData[index]); // Expect data populated correctly
      expect(control.validator).toBeTruthy(); // Expect validator to be set
    });
  });

  it('should populate tips controls with data and validators', () => {
    const tipsData = [
      'Tips 1',
      'Tips 2',
    ];
    component.tipsData = tipsData;

    component.populateFormsWithData();

    const tipsControls = component.tipsControls as unknown as FormArray;
    expect(tipsControls.length).toBe(tipsData.length); // Expect all data added

    tipsControls.controls?.forEach((control, index) => {
      expect(control.value).toEqual(tipsData[index]); // Expect data populated correctly
      expect(control.validator).toBeTruthy(); // Expect validator to be set
    });
  });


  it('should call postNewRecipe on recipeManService and handle successful response', () => {

    (recipeServiceMock.postNewRecipe as jest.Mock).mockReturnValue(of(successfulResponse));
    component.onAddRecipe(mockRecipe);

    expect(recipeServiceMock.postNewRecipe)
      .toHaveBeenLastCalledWith(mockRecipe);
    expect(snackbarMock.showNotificationMessage)
      .toHaveBeenCalledWith(successfulResponse.message, 'snackbar-success');
    expect(routerMock.navigate)
      .toHaveBeenCalledWith(['/home']);
  });

  it('should call postNewRecipe on recipeManService and handle server down error', () => {
    const postNewRecipe$ = recipeServiceMock.postNewRecipe as jest.Mock;
    const serverDownError = throwError("Server Error!!");
    postNewRecipe$.mockReturnValue(serverDownError);
    jest.spyOn(snackbarMock, "showNotificationMessage")

    component.onAddRecipe(mockRecipe);

    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith("Server Error!!", "snackbar-danger");
  })

  it('should call postNewRecipe on recipeManService and handle error response', () => {
    (recipeServiceMock.postNewRecipe as jest.Mock).mockReturnValue(of(errorResponse));

    //Trigger the function 
    component.onAddRecipe(mockRecipe);

    expect(recipeServiceMock.postNewRecipe)
      .toHaveBeenLastCalledWith(mockRecipe);
    expect(snackbarMock.showNotificationMessage)
      .toHaveBeenCalledWith(errorResponse.message, "snackbar-danger");
  });

  it('should call onUpdateRecipe on recipeManService and handle successful response', () => {

    (recipeServiceMock.updateRecipe as jest.Mock).mockReturnValue(of(successfulResponse));
    component.onUpdateRecipe(mockRecipe);

    expect(recipeServiceMock.updateRecipe)
      .toHaveBeenLastCalledWith(mockRecipe);
    expect(snackbarMock.showNotificationMessage)
      .toHaveBeenCalledWith(successfulResponse.message, 'snackbar-success');
    expect(routerMock.navigate)
      .toHaveBeenCalledWith(['/home']);
  });

  it('should call updateRecipe on recipeManService and handle server down error', () => {
    const onUpdateRecipe$ = recipeServiceMock.updateRecipe as jest.Mock;
    const serverDownError = throwError("Server Error!!");
    onUpdateRecipe$.mockReturnValue(serverDownError);
    jest.spyOn(snackbarMock, "showNotificationMessage")

    component.onUpdateRecipe(mockRecipe);

    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith("Server Error!!", "snackbar-danger");
  })

  it('should call onUpdateRecipe on recipeManService and handle error response', () => {
    (recipeServiceMock.updateRecipe as jest.Mock).mockReturnValue(of(errorResponse));

    //Trigger the function 
    component.onUpdateRecipe(mockRecipe);

    expect(recipeServiceMock.updateRecipe)
      .toHaveBeenLastCalledWith(mockRecipe);
    expect(snackbarMock.showNotificationMessage)
      .toHaveBeenCalledWith(errorResponse.message, "snackbar-danger");
  });



  it('should call searchByRecipeId and handle successful response (200)', () => {
    const id: number = 1;
    const formValues = {
      title: successfulResponse.entity.title,
      description: successfulResponse.entity.description,
      yield: successfulResponse.entity.yield,
      prepTime: successfulResponse.entity.prepTime,
      cookTime: successfulResponse.entity.cookTime,
      place: successfulResponse.entity.place,
      time: successfulResponse.entity.time,
    }
    const searchByRecipeId$ = recipeServiceMock.searchRecipeById as jest.Mock;
    searchByRecipeId$.mockReturnValue(of(successfulResponse));
    jest.spyOn(component, "populateFormsWithData");

    component.onSearchRecipe(id);
    
    expect(searchByRecipeId$).toHaveBeenCalledWith(new HttpParams().set("id", id));
    expect(component.formData).toBe(successfulResponse.entity);
    expect(component.currentId).toBe(successfulResponse.entity.id);
    expect(component.pageFunction).toBe('Update');


    //Assert the form values
    expect(component.recipeDetailsForm.value).toMatchObject(formValues)

    //Assert the array values 
    expect(component.ingredientsData.length).toEqual(successfulResponse.entity.ingredients.length);
    expect(component.tipsData.length).toEqual(successfulResponse.entity.tips.length);
    expect(component.instructionsData.length).toEqual(successfulResponse.entity.instructions.length);

    //Expect the population function to have been called 
    expect(component.populateFormsWithData).toHaveBeenCalled();
  }); 

  it('should call searchByReceipeId in recipe Service and handle a not 200 response', () => {
    const id: number = 1;
    const searchByRecipeId$ = recipeServiceMock.searchRecipeById as jest.Mock;
    searchByRecipeId$.mockReturnValue(of(errorResponse));
    jest.spyOn(snackbarMock, "showNotificationMessage");

    component.onSearchRecipe(id);

    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith(errorResponse.message, "snackbar-danger");
  })

  it('should handle server down respnse for searchRecipeById', () => {
    const searchByRecipeId$ = recipeServiceMock.searchRecipeById as jest.Mock;
    const id: number = 1;
    const serverDownError = throwError("Server Error");
    searchByRecipeId$.mockReturnValue((serverDownError));
    jest.spyOn(snackbarMock, "showNotificationMessage");

    component.onSearchRecipe(id);

    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith("Server Error!!", "snackbar-danger");
  });

  it('should navigate to previous url using location back service', () => {
    const back$ = locationMock.back as jest.Mock;

    //Trigger run 
    component.onCancel();

    expect(back$).toHaveBeenCalled();
  })


  //On Submit Function
  // it('should call onUpdateRecipe when pageFunction is update', () => {
  //   jest.spyOn(component, "onSubmit");
  //   jest.spyOn(component, "onUpdateRecipe");

  //   component.pageFunction = 'Update';  

  //   component.onSubmit();

  //   expect(component.onUpdateRecipe).toHaveBeenCalled();
  // })



});


