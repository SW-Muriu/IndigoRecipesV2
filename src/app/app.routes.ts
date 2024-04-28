import { Routes } from '@angular/router';
import { SigninComponent } from './admin/authentication/signin/signin.component';
import { ProfileManagementComponent } from './admin/authentication/profile-management/profile-management.component';
import { SignupComponent } from './admin/authentication/signup/signup.component';
import { ManageRecipeComponent } from './recipe-management/manage-recipe/manage-recipe.component';
import { RecipeHolderComponent } from './recipe-management/recipe-holder/recipe-holder.component';
import { RecipeviewerComponent } from './recipe-management/recipeviewer/recipeviewer.component';
import { HomePageComponent } from './architecture/layout/home-page/home-page.component';

export const routes: Routes = [

    {
        path: "",
        component: HomePageComponent,
        children: [{
            path: '',
            redirectTo: "#", pathMatch: "full"
        }]
    },

    { path: "#", component: SigninComponent },
    { path: "signup", component: SignupComponent },
    { path: "profile", component: ProfileManagementComponent },
    { path: "manage/recipe", component: ManageRecipeComponent },
    { path: "recipe/holder", component: RecipeHolderComponent }, 
    { path: "recipe/viewer", component: RecipeviewerComponent },
    { path: "home", component: HomePageComponent}
     
];
