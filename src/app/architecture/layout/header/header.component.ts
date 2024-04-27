import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  currentUserName!: string | null;
  currentUserEmail!: string | null;
  hideSearch: string | null = this.currentUserName;
  shouldDeferContent: boolean = false;

  constructor(
    private router: Router,

  ) {
   }


  ngOnInit(): void {
    this.currentUserName = sessionStorage.getItem('username');
    this.currentUserEmail = sessionStorage.getItem('email');

  }


  /**** Adding a recipe */
  addRecipe(): void {
    console.log("Adding Recipe");
    let route = 'recipe/holder';
    this.router.navigate([route]);
  }

  /**** Navigate back to home */
  navigateToHome(): void {
    let route = '/home'
    this.router.navigate([route]);
  }

  /**** Logging out */
  onLogout(): void {
    const route = '/#';
    sessionStorage.removeItem("username");
    this.router.navigate([route]);
  }

  updateProfile(): void {
    let route = '/profile';
    this.router.navigate([route]);
  }

}





