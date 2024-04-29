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

  constructor(
    private recipeManService: RecipeService,
    private router: Router,
    private snackbarManService: NotificationService,
  ) {
    // this.recipes = this.recipeManService.sampledRecipes;
  }

  ngOnInit(): void {
    this.getAllRecipes();
    this.getMyRecipes();
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
          if (res.statusCode == 200) {
            this.recipes = res.entity;
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
}
