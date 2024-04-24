import { Routes } from '@angular/router';
import { SigninComponent } from './admin/authentication/signin/signin.component';

export const routes: Routes = [

    {
        path: "",
        component: SigninComponent,
        children: [{
            path: '',
            redirectTo: "#", pathMatch: "full"
        }]
    },

    { path: "#", component: SigninComponent }
];
