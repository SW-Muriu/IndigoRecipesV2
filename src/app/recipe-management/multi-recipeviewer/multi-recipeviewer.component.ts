import { Component } from '@angular/core';
import { SharedModule } from '../../architecture/modules/shared.module';
import { HeaderComponent } from '../../architecture/layout/header/header.component';
import { FooterComponent } from '../../architecture/layout/footer/footer.component';
import { RecipeHolderComponent } from '../recipe-holder/recipe-holder.component';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../../architecture/utils/interfaces';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../../architecture/services/notification/notification.service';

@Component({
  selector: 'app-multi-recipeviewer',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent,
    FooterComponent,
    RecipeHolderComponent,
  ],
  templateUrl: './multi-recipeviewer.component.html',
  styleUrl: './multi-recipeviewer.component.scss'
})
export class MultiRecipeviewerComponent {

  favRecipes: Recipe[] = [];
  myRecipes: Recipe[] = [];
  recipes: Recipe[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  shouldDeferContent: boolean = true;

  constructor(
    private recipeManService: RecipeService,
    private router: Router,
    private snackbarManService: NotificationService,
  ) {
    // this.recipes = this.recipeManService.sampledRecipes;
    this.recipeManService.shouldDeferContent = true;
   
  }

  ngOnInit(): void {
    this.getAllRecipes();
    this.getMyRecipes();
    this.getSavedRecipes(); 
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


  //Add Recipe
  addRecipe(): void {
    let route = `manage/recipe`;
    this.router.navigate([route]);
  }

  //Fetch All Recipes
  getAllRecipes(): void {
    this.recipeManService
      .fetchAllRecipes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          (res.statusCode == 200) ?
            this.recipes = res.entity :
            this.snackbarManService.showNotificationMessage(res.message, "snackbar-danger");
        },
        error: (err) => {
          this.snackbarManService.showNotificationMessage("server-error!!", "snackbar-danger");
        },
        complete: () => { }
      });
  }

  //Fetch My Recipes
  getMyRecipes(): void {
    this.recipeManService
      .fetchMyRecipes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.myRecipes = res.entity;
          } else {
            this.snackbarManService.showNotificationMessage(res.message, "snackbar-danger");
          }
        },
        error: (err) => {
          this.snackbarManService.showNotificationMessage("server-error!!", "snackbar-danger");
        },
        complete: () => { }
      })
  }

  //Get Saved Recipes
  getSavedRecipes(): void {
    this.recipeManService
      .fetchFavRecipes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) {
            this.favRecipes = res.entity;
          } else {
            this.snackbarManService.showNotificationMessage(res.message, "snackbar-danger");
          }
        },
        error: (err) => {
          this.snackbarManService.showNotificationMessage("server-error!!", "snackbar-danger");
        },
        complete: () => { }
      })
  }

  //Onsearch
  onSearch(searchValue: string) {
    this.myRecipes = this.searchThroughRecipes(this.myRecipes, searchValue);
    this.favRecipes = this.searchThroughRecipes(this.favRecipes, searchValue);
    this.recipes = this.searchThroughRecipes(this.recipes, searchValue);
  }

  searchThroughRecipes(recipes: Recipe[], searchValue: string): Recipe[] {
    if (!searchValue) {
      return recipes;
    } else {
      searchValue = searchValue.toLowerCase();
      return recipes.filter(recipe => {
        return recipe.place?.toLowerCase().includes(searchValue) ||
          recipe.owner?.toLowerCase().includes(searchValue) ||
          recipe.time?.toLowerCase().includes(searchValue) ||
          recipe.title?.toLowerCase().includes(searchValue);
      })
    }
  }


  //clear search 
  onClearSearch($event: string): void {
    this.getAllRecipes();
    this.getMyRecipes();
    this.getSavedRecipes();
  }
}
