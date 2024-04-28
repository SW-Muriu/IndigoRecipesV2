import { Component } from '@angular/core';
import { SharedModule } from '../../architecture/modules/shared.module';
import { FooterComponent } from '../../architecture/layout/footer/footer.component';
import { HeaderComponent } from '../../architecture/layout/header/header.component';
import { Comment, Recipe } from '../../architecture/utils/interfaces';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
export class RecipeviewerComponent {

  stars = [1, 2, 3, 4, 5];
  commentForm: FormGroup
  rating: number = 4;
  recipe: any;
  isFavorite: boolean = true;
  imageUrl: string = "https://via.placeholder.com/300";
  Testrecipe: string = "Test Recipe"
  ingredients: string[] = [];
  instructions: string[] = [];
  tips: string[] = [];
  newComment: string = "";
  username: string = "Test User";
  comments: Comment[] = [
    {
      sender: "Hello",
      text: "My Name"
    }
  ];


  constructor(
    private fb: FormBuilder,
    private router: Router, 
  ) {
    this.commentForm = this.fb.group({
      newComment: ['', [Validators.required]],
      rating: [''],
    })
  }


  ngOnInit(): void {
    this.recipe = {
      description: "Ugali mayai is a popular Kenyan dish that combines the staple ugali (cornmeal porridge) with scrambled eggs. It's a filling, budget-friendly meal that's easy to prepare.The texture of the soft, creamy eggs contrasts nicely with the dense, starchy ugali, creating a satisfying and comforting dish.",
      title: 'Ugali Mayai',
      yield: 4,
      rating: 4,
      prepTime: 20,
      cookTime: 30,
      totalTime: 50,
      id: 0,
      time: "Breakfast",
      imageUrl: './../../../assets/political.png',
      // imageUrl: "https://via.placeholder.com/300", 
      place: "African",
      ingredients: [
        "2 boneless, skinless chicken breasts",
        "1 tablespoon olive oil",
        "1 teaspoon dried oregano",
        "1/2 teaspoon garlic powder",
        "1/4 teaspoon salt",
        "1/4 teaspoon black pepper",
        "1 bunch asparagus, trimmed",
        "1 lemon, sliced",
      ],
      instructions: [
        "Preheat oven to 400°F (200°C). Lightly grease a baking sheet.",
        "In a bowl, toss chicken breasts with olive oil, oregano, garlic powder, salt, and pepper.",
        "Arrange chicken breasts on the prepared baking sheet. Scatter asparagus spears around the chicken.",
        "Top with lemon slices.",
        "Bake for 25 minutes, or until chicken is cooked through and asparagus is tender-crisp",
      ],
      tips: [
        "For added flavor, marinate the chicken in the olive oil mixture for 30 minutes before baking.",
        "You can substitute other vegetables for the asparagus, such as broccoli florets or bell peppers.",
        "Serve with rice or quinoa for a complete meal.",
      ],
      comments: [{
        sender: 'samsicker',
        text: 'This recipe was delicious! I loved the flavor combinations.'
      }],
      owner: 'junior',
      isFavourited: true,
    }
  }

  saveClicked(id: number): void {

  }

  rateClicked(id: number): void {

  }

  shareClicked(id: number): void {
    
  }

  addComment(): void {
    if (this.newComment.trim() !== '') {
      this.recipe.comments.unshift({ sender: `${this.username}`, text: this.newComment });
      this.newComment = '';

    }
  }

  navigateBackHome(): void {
    let route = `/home`;
    this.router.navigate([route]);

  }
}
