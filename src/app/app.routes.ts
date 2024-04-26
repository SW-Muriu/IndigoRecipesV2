import { Routes } from '@angular/router';
import { SigninComponent } from './admin/authentication/signin/signin.component';
import { ProfileManagementComponent } from './admin/authentication/profile-management/profile-management.component';

export const routes: Routes = [

    {
        path: "",
        component: ProfileManagementComponent,
        children: [{
            path: '',
            redirectTo: "#", pathMatch: "full"
        }]
    },

    { path: "#", component: SigninComponent }
];
