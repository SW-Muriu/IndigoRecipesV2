import { Routes } from '@angular/router';
import { SigninComponent } from './admin/authentication/signin/signin.component';
import { ProfileManagementComponent } from './admin/authentication/profile-management/profile-management.component';
import { SignupComponent } from './admin/authentication/signup/signup.component';

export const routes: Routes = [

    {
        path: "",
        component: SignupComponent,
        children: [{
            path: '',
            redirectTo: "#", pathMatch: "full"
        }]
    },

    { path: "#", component: SigninComponent }
];
