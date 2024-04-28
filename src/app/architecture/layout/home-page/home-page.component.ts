import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RecipeHolderComponent } from '../../../recipe-management/recipe-holder/recipe-holder.component';
import { Recipe } from '../../utils/interfaces';

import { Router } from '@angular/router';
import { RecipeService } from '../../../recipe-management/services/recipe.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent,
    FooterComponent,
    RecipeHolderComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  stars = [1, 2, 3, 4, 5];
  rating: number = 4;
  reviewsArray: { sender: string, message: string }[] = [];
  currentIndex: number = 0;
  recipes: Recipe[] = [];


  constructor(
    private router: Router,
    private recipeManService: RecipeService,
  ) {
    this.recipes = this.recipeManService.sampledRecipes;
    this.reviewsArray = this.recipeManService.sampledReviews;
  }


  selectCuisine(): void {
    let route = "/recipes/viewer";
    this.router.navigate([route]);
  }

  /** Navigating through the reviews */
  nextReview(): void {
    this.currentIndex = (this.currentIndex + 1) % this.reviewsArray.length;
  }

  prevReview(): void {
    this.currentIndex = (this.currentIndex - 1 + this.reviewsArray.length) % this.reviewsArray.length;
  }

}
