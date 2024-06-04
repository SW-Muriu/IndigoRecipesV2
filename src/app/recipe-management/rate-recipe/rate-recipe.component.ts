import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RecipeviewerComponent } from '../recipeviewer/recipeviewer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rate-recipe',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatDialogModule, 
    MatIconModule
  ],
  templateUrl: './rate-recipe.component.html',
  styleUrl: './rate-recipe.component.scss'
})
export class RateRecipeComponent {

  constructor(
    public dialogRef: MatDialogRef<RecipeviewerComponent>
  ) {

  }

  selectedStar: number = 0;


  selectStar(rating: number) {
    this.selectedStar = rating
  }

  onRate() {
    console.log(this.selectedStar);
    
  }

}
