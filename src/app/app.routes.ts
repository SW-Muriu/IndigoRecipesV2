import { Routes } from '@angular/router';
import { SigninComponent } from './admin/authentication/signin/signin.component';
import { ProfileManagementComponent } from './admin/authentication/profile-management/profile-management.component';
import { SignupComponent } from './admin/authentication/signup/signup.component';
import { ManageRecipeComponent } from './recipe-management/manage-recipe/manage-recipe.component';
import { RecipeHolderComponent } from './recipe-management/recipe-holder/recipe-holder.component';
import { RecipeviewerComponent } from './recipe-management/recipeviewer/recipeviewer.component';
import { HomePageComponent } from './architecture/layout/home-page/home-page.component';
import { combineLatest } from 'rxjs';
import { MultiRecipeviewerComponent } from './recipe-management/multi-recipeviewer/multi-recipeviewer.component';
import { authenticationGuard } from './admin/authentication/guards/authentication.guard';

export const routes: Routes = [

    {
        path: "",
        component: SigninComponent,
        children: [{
            path: '',
            redirectTo: "#", pathMatch: "full"
        }]
    },

    { path: "#", component: SigninComponent },
    { path: "signup", component: SignupComponent },
    {
        path: "profile",
        canActivate: [authenticationGuard],
        component: ProfileManagementComponent
    },
    {
        path: "manage/recipe",
        canActivate: [authenticationGuard],
        component: ManageRecipeComponent
    },
    {
        path: "recipe/holder",
        canActivate: [authenticationGuard],
        component: RecipeHolderComponent
    }, 
    {
        path: "recipe/viewer",
        canActivate: [authenticationGuard],
        component: RecipeviewerComponent
    },
    {
        path: "home",
        canActivate: [authenticationGuard],
        component: HomePageComponent
    }, 
    {
        path: "recipes/viewer",
        canActivate: [authenticationGuard],
        component: MultiRecipeviewerComponent
    }, 
     
];
