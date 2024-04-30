import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RecipeHolderComponent } from '../../../recipe-management/recipe-holder/recipe-holder.component';
import { Recipe } from '../../utils/interfaces';

import { Router } from '@angular/router';
import { RecipeService } from '../../../recipe-management/services/recipe.service';
import { Subject, takeUntil } from 'rxjs';
import { NotificationService } from '../../services/notification/notification.service';

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
export class HomePageComponent implements OnDestroy, OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  stars = [1, 2, 3, 4, 5];
  rating: number = 4;
  reviewsArray: { sender: string, message: string }[] = [];
  currentIndex$ = signal<number>(0);
  recipes: Recipe[] = [];
  shouldDeferContent: boolean = false;



  constructor(
    private router: Router,
    private recipeManService: RecipeService,
    private snackbarManService: NotificationService,
  ) {
    // this.recipes = this.recipeManService.sampledRecipes;
    this.reviewsArray = this.recipeManService.sampledReviews;
  }

  ngOnInit(): void {
    this.getNewRecipes();
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


  selectCuisine(): void {
    let route = "/recipes/viewer";
    this.router.navigate([route]);
  }

  /** Navigating through the reviews */
  nextReview(): void  {
    this.currentIndex$.update((defaultValue) => (defaultValue + 1) % this.reviewsArray.length);
  }

  prevReview(): void {
    this.currentIndex$.update((defaultValue) => (defaultValue - 1 + this.reviewsArray.length) % this.reviewsArray.length);
  }


  //Fetch first 8 recipes
  getNewRecipes(): void {
    this.recipeManService
      .fetchNewRecipes()
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


}
