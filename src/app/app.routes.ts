import { Routes } from '@angular/router';
import { SigninComponent } from './admin/authentication/signin/signin.component';
import { SignupComponent } from './admin/authentication/signup/signup.component';
import { HomePageComponent } from './architecture/layout/home-page/home-page.component';
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
        loadComponent: () => import('./admin/authentication/profile-management/profile-management.component')
            .then((mod) => mod.ProfileManagementComponent),
    },
    {
        path: "manage/recipe",
        canActivate: [authenticationGuard],
        loadComponent: () => import('./recipe-management/manage-recipe/manage-recipe.component')
            .then((mod) => mod.ManageRecipeComponent),
    },
    {
        path: "recipe/holder",
        canActivate: [authenticationGuard],
        loadComponent: ()=> import('./recipe-management/recipe-holder/recipe-holder.component')
        .then((mod)=>mod.RecipeHolderComponent),
    }, 
    {
        path: "recipe/viewer",
        canActivate: [authenticationGuard],
        loadComponent: () => import('./recipe-management/recipeviewer/recipeviewer.component')
        .then((m)=> m.RecipeviewerComponent),
    },
    {
        path: "home",
        canActivate: [authenticationGuard],
        component: HomePageComponent
    }, 
    {
        path: "recipes/viewer",
        canActivate: [authenticationGuard],
        loadComponent: () => import('./recipe-management/multi-recipeviewer/multi-recipeviewer.component')
            .then((m) => m.MultiRecipeviewerComponent),
    }, 
     
];
