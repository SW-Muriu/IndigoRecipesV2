import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RecipeHolderComponent } from '../../../recipe-management/recipe-holder/recipe-holder.component';
import { Recipe } from '../../utils/interfaces';

export interface Reviews {
  sender: string,
  message: string
}
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
  reviewsArray: Reviews[] = [
    { sender: "Anthony", message: "This platform fosters a vibrant community where users share culinary experiences, tips, and inspiration." },
    { sender: "Titus Mbote", message: "Indigo Recipes delicious and wholesome recipes at their fingertips, individuals embrace healthier lifestyles while enjoying the pleasure of cooking" },
    { sender: "Lila_HealthyEats", message: "Indigo Recipes inspires nutritious home cooking with easy-to-follow recipes. It's my wellness ally, offering variety and tasty healthy options!" },
    { sender: "ChefMichael", message: "Indigo Recipes elevates culinary creativity with diverse, detailed recipes. It's my go-to for inspiration and experimentation. Impressive app!" },
    { sender: "Emily_FoodieExplorer", message: "Indigo Recipes fuels my culinary adventures with delicious variety. Easy navigation and sharing make it a joy to explore and cook!" }, 
    { sender: "HealthyMomma", message: "Indigo Recipes simplifies healthy cooking for my family. Accommodating dietary needs, it's our go-to for flavorful, nutritious meals at home." },
    { sender: "Chef Fab", message: "Indigo Recipes makes staying fit deliciously easy! Nutritious, flavorful dishes with helpful nutritional info. A must for health-conscious cooks!" }
  ];
  currentIndex: number = 0;
  recipes: Recipe[] = [
    {
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
    },
    {
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
    }, {
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
    }, {
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
    },
  ];


  

  selectCuisine(cuisine: string) {
    
  }

  /** Navigating through the reviews */
  nextReview(): void {
    this.currentIndex = (this.currentIndex + 1) % this.reviewsArray.length;
  }

  prevReview(): void {
    this.currentIndex = (this.currentIndex - 1 + this.reviewsArray.length) % this.reviewsArray.length;
  }

}
