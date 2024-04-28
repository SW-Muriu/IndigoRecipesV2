import { Component } from '@angular/core';
import { SharedModule } from '../../architecture/modules/shared.module';
import { HeaderComponent } from '../../architecture/layout/header/header.component';
import { FooterComponent } from '../../architecture/layout/footer/footer.component';
import { RecipeHolderComponent } from '../recipe-holder/recipe-holder.component';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../../architecture/utils/interfaces';
import { Router } from '@angular/router';

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

  constructor(
    private recipeManService: RecipeService,
    private router: Router
  ) {
    this.recipes = this.recipeManService.sampledRecipes;
  }


  //Add Recipe
  addRecipe(): void {
    let route = `manage/recipe`;
    this.router.navigate([route]);
  }
}
