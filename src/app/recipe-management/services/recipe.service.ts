import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../../architecture/utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  serverUrl: String = `${environment.baseUrl}/ap1/v1/recipes`;

  constructor(
    private _http: HttpClient
  ) { }

  /***********************************************************************************************************
 * Server integration
 */
  postNewRecipe(recipeDetails: any): Observable<any> {
    console.log("RECIPE DETAILSSSS:::", recipeDetails);
    const url = `${this.serverUrl}/post`;
    return this._http.post<any>(url, recipeDetails);
  }

  fetchAllRecipes(): Observable<any> {
    const url = `${this.serverUrl}/get/all`;
    return this._http.get<any>(url);
  }

  fetchFavRecipes(): Observable<any> {
    const url = `${this.serverUrl}/get/favRecipes`;
    return this._http.get<any>(url);
  }

  fetchNewRecipes(): Observable<any> {
    const url = `${this.serverUrl}/get/newRecipes`;
    return this._http.get<any>(url);
  }

  fetchMyRecipes(): Observable<any> {
    const url = `${this.serverUrl}/get/myRecipes`;
    return this._http.get<any>(url);
  }

  searchRecipeById(params: any): Observable<any> {
    const url = `${this.serverUrl}/get/id`;
    return this._http.get<any>(url, { params: params });
  }

  updateRecipe(recipeDetails: any): Observable<any> {
    const url = `${this.serverUrl}/update`;
    return this._http.put<any>(url, recipeDetails)
  }

  deleteRecipe(recipeDetails: any): Observable<any>{
    const url = `${this.serverUrl}/delete`;
    return this._http.delete<any>(url, {body: recipeDetails});
  }

  favoriteRecipe(params: any): Observable<any>{
    const url = `${this.serverUrl}/favorite`;
    return this._http.put<any>(url, params);
  }


  //Dummy Data
  sampledReviews: { sender: string, message: string }[] = [
    { sender: "Anthony", message: "This platform fosters a vibrant community where users share culinary experiences, tips, and inspiration." },
    { sender: "Titus Mbote", message: "Indigo Recipes delicious and wholesome recipes at their fingertips, individuals embrace healthier lifestyles while enjoying the pleasure of cooking" },
    { sender: "Lila_HealthyEats", message: "Indigo Recipes inspires nutritious home cooking with easy-to-follow recipes. It's my wellness ally, offering variety and tasty healthy options!" },
    { sender: "ChefMichael", message: "Indigo Recipes elevates culinary creativity with diverse, detailed recipes. It's my go-to for inspiration and experimentation. Impressive app!" },
    { sender: "Emily_FoodieExplorer", message: "Indigo Recipes fuels my culinary adventures with delicious variety. Easy navigation and sharing make it a joy to explore and cook!" },
    { sender: "HealthyMomma", message: "Indigo Recipes simplifies healthy cooking for my family. Accommodating dietary needs, it's our go-to for flavorful, nutritious meals at home." },
    { sender: "Chef Fab", message: "Indigo Recipes makes staying fit deliciously easy! Nutritious, flavorful dishes with helpful nutritional info. A must for health-conscious cooks!" }
  ]

  sampledRecipes: Recipe[] = [
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
  ]
}
