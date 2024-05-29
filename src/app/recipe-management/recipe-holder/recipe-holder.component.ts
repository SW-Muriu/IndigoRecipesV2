import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../architecture/modules/shared.module';
import { HeaderComponent } from '../../architecture/layout/header/header.component';
import { FooterComponent } from '../../architecture/layout/footer/footer.component';
import { Recipe } from '../../architecture/utils/interfaces';
import { RecipeService } from '../services/recipe.service';
import { Subject, takeUntil } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { NotificationService } from '../../architecture/services/notification/notification.service';
import { Router } from '@angular/router';
import { ManageRecipeComponent } from '../manage-recipe/manage-recipe.component';

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
 
  hoverUnderline: boolean = false
  stars = [1, 2, 3, 4, 5];
  rating!: number;

  constructor(
    private recipeManService: RecipeService,
    private snackbar: NotificationService,
    private router: Router,
  ) {

  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  /** View More Details on a singular recipe */
  onViewMore(id: number): void {
    let route = '/recipe/viewer';
    this.router.navigate([route], {
      queryParams: {
        id: id
      }, 
      skipLocationChange: true
    })

  }
  
  


  onLike(id: number): void {
    const params = new HttpParams()
      .set('id', id);
    this.recipeManService
      .favoriteRecipe(params)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          (res.statusCode == 200) ? this.snackbar.showNotificationMessage(res.message, "snackbar-success") :
            this.snackbar.showNotificationMessage(res.message, "snackbar-danger");
        },
        error: () => {
          this.snackbar.showNotificationMessage("Server Error!!", "snackbar-danger");
        },
        complete: () => { },
      })
  }

}
