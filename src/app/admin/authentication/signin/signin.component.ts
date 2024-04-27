import { Component } from '@angular/core';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeaderComponent } from '../../../architecture/layout/header/header.component';
import { ProfileManagementComponent } from '../profile-management/profile-management.component';
import { RecipeHolderComponent } from '../../../recipe-management/recipe-holder/recipe-holder.component';
import { Recipe } from '../../../architecture/utils/interfaces';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [
    SharedModule,
    HeaderComponent, 
    ProfileManagementComponent,
    RecipeHolderComponent,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
login() {
throw new Error('Method not implemented.');
}

  signInForm: FormGroup
  signUpFom: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }); 

    this.signUpFom = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.required],],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    })
  }

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

}
