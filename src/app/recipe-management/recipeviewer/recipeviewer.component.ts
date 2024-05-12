import { BootstrapOptions, Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../architecture/modules/shared.module';
import { FooterComponent } from '../../architecture/layout/footer/footer.component';
import { HeaderComponent } from '../../architecture/layout/header/header.component';
import { Comment, Recipe } from '../../architecture/utils/interfaces';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../services/recipe.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

import { NotificationService } from '../../architecture/services/notification/notification.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-recipeviewer',
  standalone: true,
  imports: [
    SharedModule,
    FooterComponent,
    HeaderComponent,
    FormsModule
  ],
  templateUrl: './recipeviewer.component.html',
  styleUrl: './recipeviewer.component.scss'
})
export class RecipeviewerComponent implements OnInit, OnDestroy {

  stars = [1, 2, 3, 4, 5];
  rating: number = 4;
  recipe: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  isFavorite: boolean = true;
  imageUrl: string = "https://via.placeholder.com/300";
  Testrecipe: string = "Test Recipe"
  ingredients: string[] = [];
  instructions: string[] = [];
  tips: string[] = [];
  newComment: string = "";
  username: string | null = "";
  comments: Comment[] = [
    {
      sender: "Hello",
      text: "My Name"
    }
  ];
  hideEditDelete: boolean = false;


  constructor(
    private router: Router,
    private location: Location,
    private recipeManService: RecipeService,
    private route: ActivatedRoute,
    private snackbarManService: NotificationService
  ) {
    this.username = sessionStorage.getItem('username');
  }


  ngOnInit(): void {
    if (this.route.queryParams) {
      this.route.queryParams.subscribe({
        next: (params) => {
          if (params.hasOwnProperty('id')) this.recipe = this.searchRecipeById(params['id']);
        }
      })
    }

    // this.recipe = {
    //   description: "Ugali mayai is a popular Kenyan dish that combines the staple ugali (cornmeal porridge) with scrambled eggs. It's a filling, budget-friendly meal that's easy to prepare.The texture of the soft, creamy eggs contrasts nicely with the dense, starchy ugali, creating a satisfying and comforting dish.",
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
    // }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


  //Fetch recipe by ID
  searchRecipeById(id: number): Recipe {
    const params = new HttpParams()
      .set("id", id);
    this.recipeManService
      .searchRecipeById(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.statusCode == 200) this.recipe = res.entity;
          (this.recipe.owner == this.username) ? this.hideEditDelete = true : this.hideEditDelete = false;
        }
      });
    return this.recipe;
  }

  saveClicked(id: number): void {
    const params = new HttpParams()
      .set('id', id);
    this.recipeManService
      .favoriteRecipe(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          //Change later to map the users****
          (res.statusCode == 200) ? this.snackbarManService.showNotificationMessage(res.message, "snackbar-success") :
            this.snackbarManService.showNotificationMessage(res.message, "snackbar-danger");
        },
      })

  }

  rateClicked(id: number): void {

  }

  //Edit
  editClicked(id: number) {
    let route = '/manage/recipe';
    this.router.navigate([route], {
      queryParams: {
        data: JSON.stringify(id)
      }
    })
  }

  deleteClicked(recipe: any): void {
    this.recipeManService.deleteRecipe(recipe).pipe(takeUntil(this.destroy$)).subscribe({
      next: (res) => {
        if (res.statusCode == 200) {
          this.snackbarManService.showNotificationMessage(res.message, "snackbar-success");
          this.router.navigate([`/recipes/viewer`]);
        } else {
          this.snackbarManService.showNotificationMessage(res.message, "snackbar-danger");
        }
      },
      complete: () => {
      },
    })
  }

  shareClicked(title: string): void {
    // Generate shareable link
    const shareLink = `https://example.com/share?title=${encodeURIComponent(title)}`;

    // Open Sweet Alert dialog with sharing options
    Swal.fire({
      title: 'Share via',
      showCancelButton: true,
      confirmButtonText: 'Facebook',
      cancelButtonText: 'WhatsApp',
      showCloseButton: true,
      html: `You can also <a href="mailto:?subject=Check out this article&amp;body=${shareLink}">Email</a> it.`,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.snackbarManService.showNotificationMessage("Recipe shared successfully on Facebook", 'snackbar-success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.snackbarManService.showNotificationMessage("Recipe shared successfully on WhatsApp", 'snackbar-success');
      } else {
        this.snackbarManService.showNotificationMessage("Recipe shared successfully via Email", 'snackbar-success');
      }
    });
  }

  addComment(): void {
    if (this.newComment.trim() !== '') {
      this.recipe.comments.unshift({ sender: `${this.username}`, text: this.newComment });
      this.newComment = '';
      
      this.recipeManService
        .updateRecipe(this.recipe)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            (res.statusCode == 200) ? this.snackbarManService.showNotificationMessage("Recipe Reviewed Successfully!!", "snackbar-success") :
              this.snackbarManService.showNotificationMessage("There was a problem reviewing the recipe!!", "snackbar-danger");
          },
          error: (err) => {
            this.snackbarManService.showNotificationMessage(err.message, "snackbar-danger");
          }
        })
    }
  }

  navigateBackHome(): void {
    this.location.back();
  }
}

