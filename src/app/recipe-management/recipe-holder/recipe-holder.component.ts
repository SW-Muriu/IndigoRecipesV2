import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../architecture/modules/shared.module';
import { HeaderComponent } from '../../architecture/layout/header/header.component';
import { FooterComponent } from '../../architecture/layout/footer/footer.component';
import { Recipe } from '../../architecture/utils/interfaces';
import { RecipeService } from '../services/recipe.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { NotificationService } from '../../architecture/services/notification/notification.service';

@Component({
  selector: 'app-recipe-holder',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './recipe-holder.component.html',
  styleUrl: './recipe-holder.component.scss'
})
export class RecipeHolderComponent {

  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() recipes: Recipe[] | null = null;
  //   title: 'Ugali Mayai',
  //   yield: 4,
  //   rating: 4,
  //   prepTime: 20,
  //   cookTime: 30,
  //   totalTime: 50,
  //   id: 0,
  //   time: "Breakfast",
  //   imageUrl: './../../../assets/political.png',
  //   // imageUrl: "https://via.placeholder.com/300", 
  //   place: "African",
  //   ingredients: [
  //     "2 boneless, skinless chicken breasts",
  //     "1 tablespoon olive oil",
  //     "1 teaspoon dried oregano",
  //     "1/2 teaspoon garlic powder",
  //     "1/4 teaspoon salt",
  //     "1/4 teaspoon black pepper",
  //     "1 bunch asparagus, trimmed",
  //     "1 lemon, sliced",
  //   ],
  //   instructions: [
  //     "Preheat oven to 400°F (200°C). Lightly grease a baking sheet.",
  //     "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper.",
  //     "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken.",
  //     "Top with lemon slices.",
  //     "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp",
  //   ],
  //   tips: [
  //     "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking.",
  //     "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers.",
  //     "Serve with rice or quinoa for a complete meal.",
  //   ],
  //   comments: [{
  //     sender: 'samsicker',
  //     text: 'This recipe was delicious! I loved the flavor combinations.'
  //   }],
  //   owner: 'junior',
  //   isFavourited: true,
  // },];


  hoverUnderline: boolean = false
  stars = [1, 2, 3, 4, 5];
  rating!: number;

  constructor(
    private recipeManService: RecipeService,
    private snackbar: NotificationService,
  ) {

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /** View More Details on a singular recipe */
  onViewMore(id: number): void {
    console.log("Selected");

  }


  onLike(id: number): void {
    const params = new HttpParams()
      .set('id', id);
    this.recipeManService
      .favoriteRecipe(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          switch (res.statusCode) {
            case (res.statusCode == 200):
              this.snackbar.showNotificationMessage(res.message, "snackbar-success");
              break;
            default:
              this.snackbar.showNotificationMessage(res.message, "snackbar-danger");
          }
        },
        error: (err) => {
          this.snackbar.showNotificationMessage("Server Error", "snackbar-danger");
        },
        complete: () => { },
      })
  }

}
