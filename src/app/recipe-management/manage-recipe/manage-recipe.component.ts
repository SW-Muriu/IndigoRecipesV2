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
  ingeredientsData: any;
  tipsData: any;
  instructionsData: any;
  existingRecipes: any;
  destroy$: Subject<any> = new Subject<boolean>();

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


    if (!this.route.queryParams) {
      this.pageFunction = 'Add';
    } else {
      this.route.queryParams.subscribe({
        next: (params) => {
          if (params.hasOwnProperty('data')) {
            const serializedData = params["data"];
            const searchTerm = JSON.parse(serializedData);
            console.log("SearchTerm:", searchTerm);
            this.formData = this.onSearchRecipe(searchTerm);

            //Populate the forms with the collected nested arrays data
            this.populateFormsWithData();
          }
        }
      })
    }
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

  /**** Form Submission */
  patchNestedArrays() {
    this.recipeDetailsForm.value.ingredients.push(this.ingredientsForm.value);
    this.recipeDetailsForm.value.instructions.push(this.instructionsForm.value);
    this.recipeDetailsForm.value.tips.push(this.tipsForm.value);
    this.recipeDetailsForm.value.totalTime = this.recipeDetailsForm.value.prepTime + this.recipeDetailsForm.value.cookTime;

  }

  /**** Fetch a single recipe for update */
  searchRecipesByTitle(recipes: Recipe[], searchTerm: string): Recipe[] {
    if (!searchTerm) {
      return recipes;
    }
    searchTerm = searchTerm.toLowerCase();
    return recipes.filter(recipe => {
      return recipe.title?.toLowerCase().includes(searchTerm);
    });
  }

  /**** Populate forms with the recieved data */
  populateFormsWithData(): void {
    if (this.ingeredientsData && this.ingeredientsData.length > 0) {
      this.ingeredientsData.forEach((ingredientObject: any) => {
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



  /***********************************************************************************************************************
   * Server side integration
   */

  onSubmit(): void {
    const payload: any = {
      title: this.recipeDetailsForm.value.title,
      yield: this.recipeDetailsForm.value.yield,
      prepTime: this.recipeDetailsForm.value.prepTime,
      cookTime: this.recipeDetailsForm.value.cookTime,
      place: this.recipeDetailsForm.value.place.label,
      time: this.recipeDetailsForm.value.time.label,
      totalTime: this.recipeDetailsForm.value.prepTime + this.recipeDetailsForm.value.cookTime,
      ingredients: this.ingredientsForm.value.ingredients,
      tips: this.tipsForm.value.tips,
      instructions: this.instructionsForm.value.instructions,
      comments: [],
      rating: 0,
      imageUrl: '',
      // id: 0,
    }

    const UpdatePayload: any = {
      title: this.recipeDetailsForm.value.title,
      yield: this.recipeDetailsForm.value.yield,
      prepTime: this.recipeDetailsForm.value.prepTime,
      cookTime: this.recipeDetailsForm.value.cookTime,
      place: this.recipeDetailsForm.value.place.label,
      time: this.recipeDetailsForm.value.time.label,
      totalTime: this.recipeDetailsForm.value.prepTime + this.recipeDetailsForm.value.cookTime,
      ingredients: this.ingredientsForm.value.ingredients,
      tips: this.tipsForm.value.tips,
      instructions: this.instructionsForm.value.instructions,
      id: this.currentId,
    }

    switch (this.pageFunction) {
      case 'Update':
        console.log("Updating");

        this.onUpdateRecipe(UpdatePayload);
        break;
      default:
        this.onAddRecipe(payload);
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
          if (res.statusCode == 200) {
            this.snackbarManService.showNotificationMessage(res.message, "snackbar-success");
            this.router.navigate(['/home']);
          }
          else {
            this.snackbarManService.showNotificationMessage(res.message, "snackbar-danger");
          }
        },
        error: (err) => {
          this.snackbarManService.showNotificationMessage(err.message, "snackbar-danger");
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
          this.snackbarManService.showNotificationMessage(res.message, "snackbar-success");
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.snackbarManService.showNotificationMessage(err.message, "snackbar-danger");
          this.router.navigate(['/home']);
        }
      })
  }

  onSearchRecipe(id: number): [] {
    const params = new HttpParams()
      .set("id", id)

    this.recipeManService
      .searchRecipeById(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log("RESPONSE", res);

          if (res.statusCode == 200) {
            this.formData = res.entity;
            this.currentId = res.entity.id;

            this.pageFunction = 'Update'


            //Initialize recipe Details form with data 
            this.recipeDetailsForm = this.fb.group({
              title: [this.formData.title, [Validators.required]],
              yield: [this.formData.yield, [Validators.required]],
              prepTime: [this.formData.prepTime, [Validators.required]],
              cookTime: [this.formData.cookTime, [Validators.required]],
              place: [this.formData.place, [Validators.required]],
              time: [this.formData.time, [Validators.required]],
            });


            //Call the dat for the nested arrays of the recipeDetails Form
            this.ingeredientsData = this.formData.ingredients
            this.tipsData = this.formData.tips;
            this.instructionsData = this.formData.instructions;
            this.populateFormsWithData();

          } else {
            console.log("Not 200");
            this.snackbarManService.showNotificationMessage(res.message, "snackbar-danger")
          }
        },
        error: (err) => {
          this.snackbarManService.showNotificationMessage(err.message, "snackbar-danger")
        }
      });
    return this.formData;
  }

}



