import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../architecture/modules/shared.module';
import { FooterComponent } from '../../architecture/layout/footer/footer.component';
import { HeaderComponent } from '../../architecture/layout/header/header.component';
import { Comment, Recipe } from '../../architecture/utils/interfaces';
import { FormsModule } from '@angular/forms';
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
          error: () => {
            this.snackbarManService.showNotificationMessage("Server Error!!", "snackbar-danger");
          }
        })
    }
  }

  navigateBackHome(): void {
    this.location.back();
  } 
}

