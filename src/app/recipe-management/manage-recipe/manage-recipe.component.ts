import { Component } from '@angular/core';
import { SharedModule } from '../../architecture/modules/shared.module';
import { HeaderComponent } from '../../architecture/layout/header/header.component';
import { FooterComponent } from '../../architecture/layout/footer/footer.component';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RecipeService } from '../services/recipe.service';
import { NotificationService } from '../../architecture/services/notification/notification.service';
import { Recipe } from '../../architecture/utils/interfaces';
import { Option } from '../../architecture/utils/interfaces';
import { Location } from '@angular/common';


@Component({
  selector: 'app-manage-recipe',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent,
    FooterComponent,
    HttpClientModule,
  ],
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.scss'
})
export class ManageRecipeComponent {

  recipeDetailsForm!: FormGroup; 
  
  ingredientsForm!: FormGroup;
  instructionsForm: FormGroup;
  tipsForm: FormGroup;
  pageFunction: string = "Add";
  username: string | null;
  formData: any;
  ingredientsArray: any;
  ingredientsData: any;
  tipsData: any;
  instructionsData: any;
  existingRecipes: any;
  destroy$: Subject<any> = new Subject<boolean>();
  shouldDeferContent: boolean = false;

  placeOptions: Option[] = [
    { value: 'chinese', label: 'Chinese' },
    { value: 'african', label: 'African' },
    { value: 'italian', label: 'Italian' },
  ];

  timeOptions: Option[] = [
    { value: 'Breakfast', label: 'Breakfast' },
    { value: 'Brunch', label: 'Brunch' },
    { value: 'Lunch', label: 'Lunch' },
    { value: 'Dinner', label: 'Dinner' },
  ];
  currentId: any;



  /**** Dependency Injection */
  constructor(
    private fb: FormBuilder,
    private recipeManService: RecipeService,
    private snackbarManService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
  ) {
    /**** Generate the forms whose form fields are not fixed */
    this.ingredientsForm = this.fb.group({
      ingredients: this.fb.array([]) as FormArray
    });

    this.instructionsForm = this.fb.group({
      instructions: this.fb.array([]) as FormArray,
    });

    this.tipsForm = this.fb.group({
      tips: this.fb.array([]) as FormArray,
    });

    this.username = sessionStorage.getItem('username');
  }


  /**********************************************************************************************************************************************
   * Life Cycle Hooks
   */
  ngOnInit(): void {
    this.initEmptyRecipeDetailsForm();
    if (!this.route.queryParams) this.pageFunction = 'Add';
    this.route.queryParams.subscribe({
      next: (params) => {
        if (params.hasOwnProperty('data')) {
          this.formData = this.onSearchRecipe(JSON.parse(params["data"]));

          //Populate the forms with the collected nested arrays data
          this.populateFormsWithData();
        }
      }
    })

    this.recipeDetailsForm.value.title 
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


  /**********************************************************************************************************************************************
    * Function Defintions
    */
  /**** Initiate the fized recipe details form */
  initEmptyRecipeDetailsForm(): void {
    this.recipeDetailsForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      yield: ['', [Validators.required]],
      prepTime: ['', [Validators.required]],
      cookTime: ['', [Validators.required]],
      place: ['', [Validators.required]],
      time: ['', [Validators.required]],
      totalTime: [''],
      ingredients: [[]],
      tips: [[]],
      instructions: [[]],
    });

  };


  /**** Defining the getter function which are triggered in the DOM structure */
  get ingredientControls() {
    return (this.ingredientsForm?.get('ingredients') as FormArray)?.controls as FormControl[];
  }

  get instructionControls() {
    return (this.instructionsForm?.get('instructions') as FormArray)?.controls as FormControl[];
  }

  get tipsControls() {
    return (this.tipsForm?.get('tips') as FormArray)?.controls as FormControl[];
  }



  /**** Defining addition and substraction of form fields in the unfixed forms */
  addIngredient() {
    const ingredientControl = this.fb.control('', [Validators.required]);
    (this.ingredientsForm.get('ingredients') as FormArray).push(ingredientControl);
  }

  removeIngredient(index: number) {
    (this.ingredientsForm.get('ingredients') as FormArray).removeAt(index);
  }

  addInstruction() {
    const instructionControl = this.fb.control('', [Validators.required]);
    (this.instructionsForm.get('instructions') as FormArray).push(instructionControl);
  }

  removeInstruction(index: number) {
    (this.instructionsForm.get('instructions') as FormArray).removeAt(index);
  }

  addTip() {
    const tipControl = this.fb.control('', [Validators.required]);
    (this.tipsForm.get('tips') as FormArray).push(tipControl);
  }

  removeTip(index: number) {
    (this.tipsForm.get('tips') as FormArray).removeAt(index);
  }



  /**** Populate forms with the recieved data */
  populateFormsWithData(): void {
    if (this.ingredientsData && this.ingredientsData.length > 0) {
      this.ingredientsData.forEach((ingredientObject: any) => {
        this.ingredientControls.push(this.fb.control(ingredientObject, Validators.required));
      });
    }


    if (this.instructionsData && this.instructionsData.length > 0) {
      this.instructionsData.forEach((insrtructionObj: any) => {
        this.instructionControls.push(this.fb.control(insrtructionObj, Validators.required));
      });
    }

    if (this.tipsData && this.tipsData.length > 0) {
      this.tipsData.forEach((tipsObj: any) => {
        this.tipsControls.push(this.fb.control(tipsObj, Validators.required));
      });
    }
  }

  private getUsers(): void {

  }



  /***********************************************************************************************************************
   * Server side integration
   */

  onSubmit(): void {
    this.recipeDetailsForm.value.ingredients = this.ingredientsForm.value.ingredients;
    this.recipeDetailsForm.value.tips = this.tipsForm.value.tips;
    this.recipeDetailsForm.value.instructions = this.instructionsForm.value.instructions;
    this.recipeDetailsForm.value.totalTime = this.recipeDetailsForm.value.prepTime + this.recipeDetailsForm.value.cookTime;
    this.recipeDetailsForm.value.imageUrl = '';
    this.recipeDetailsForm.value.owner = this.username;

    switch (this.pageFunction) {
      case 'Update':
        this.recipeDetailsForm.value.id = this.currentId;
        this.onUpdateRecipe(this.recipeDetailsForm.value);
        break;
      default:
        this.onAddRecipe(this.recipeDetailsForm.value);
        break;
    }
  }


  //Add Recipe
  onAddRecipe(payload: Recipe) {
    this.recipeManService
      .postNewRecipe(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode != 200) this.snackbarManService.showNotificationMessage(res.message, "snackbar-danger");
          this.snackbarManService.showNotificationMessage(res.message, "snackbar-success");
          this.router.navigate(['/home']);
        },
        error: () => {
          this.snackbarManService.showNotificationMessage("Server Error!!", "snackbar-danger");
        },
        complete: () => {

        }
      })
  }

  onUpdateRecipe(payload: Recipe) {
    this.recipeManService
      .updateRecipe(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode != 200) this.snackbarManService.showNotificationMessage(res.message, "snackbar-danger");
          this.snackbarManService.showNotificationMessage(res.message, "snackbar-success");
          this.router.navigate(['/home']);
        },
        error: () => {
          this.snackbarManService.showNotificationMessage("Server Error!!", "snackbar-danger");
        }
      })
  }

  onSearchRecipe(id: number): Recipe[] {
    const params = new HttpParams()
      .set("id", id)
    this.recipeManService
      .searchRecipeById(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode != 200) this.snackbarManService.showNotificationMessage(res.message, "snackbar-danger");
          this.formData = res.entity;
          this.currentId = res.entity.id;
          this.pageFunction = 'Update'

          //Initialize recipe Details form with data 
          this.recipeDetailsForm = this.fb.group({
            title: [this.formData.title, [Validators.required]],
            description: [this.formData.description, [Validators.required]],
            yield: [this.formData.yield, [Validators.required]],
            prepTime: [this.formData.prepTime, [Validators.required]],
            cookTime: [this.formData.cookTime, [Validators.required]],
            place: [this.formData.place, [Validators.required]],
            time: [this.formData.time, [Validators.required]],
          });

          //Call the data for the nested arrays of the recipeDetails Form
          this.ingredientsData = this.formData.ingredients
          this.tipsData = this.formData.tips;
          this.instructionsData = this.formData.instructions;
          this.populateFormsWithData();

        },
        error: () => {
          this.snackbarManService.showNotificationMessage("Server Error!!", "snackbar-danger")
        }
      });
    return this.formData;
  }

  onCancel(): void {
    this.location.back();
  }

}



