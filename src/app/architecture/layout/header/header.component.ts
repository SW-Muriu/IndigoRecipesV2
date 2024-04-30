import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '../../modules/shared.module';
import { RecipeService } from '../../../recipe-management/services/recipe.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../admin/services/authservices/auth.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SharedModule, 
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  searchTerm: string = '';
  currentUserName!: string | null;
  currentUserEmail!: string | null;
  hideSearch: string | null = this.currentUserName;
  @Input() shouldDeferContent: boolean = false;
  @Output() searchValue = new EventEmitter<string>()
  @Output() clearSearch = new EventEmitter<string>()
  // shouldDeferContent: boolean;

  constructor(
    private router: Router,
    private recipeManService: RecipeService,
    private authManService: AuthService,
    private snackbar: NotificationService,

  ) {
    this.shouldDeferContent = this.recipeManService.shouldDeferContent;
   }


  ngOnInit(): void {
    this.currentUserName = sessionStorage.getItem('username');
    this.currentUserEmail = sessionStorage.getItem('email');

  }

  performSearch() {
    this.searchValue.emit(this.searchTerm)
  }

  clearSearchTerm() {
    this.clearSearch.emit();
  }


  /**** Adding a recipe */
  addRecipe(): void {
    let route = 'manage/recipe';
    this.router.navigate([route]);
  }

  /**** Navigate back to home */
  navigateToHome(): void {
    let route = '/home'
    this.router.navigate([route]);
  }

  /**** Logging out */
  onLogout(): void {
    this.authManService.logOutUser().subscribe({
      next: (res) => {
        if (res.statusCode == 200) {
          this.snackbar.showNotificationMessage(res.message, "snackbar-success");
          const route = '/#';
          sessionStorage.removeItem("username");
          this.router.navigate([route]);
        }
      }
    })
  }

  updateProfile(): void {
    let route = '/profile';
    this.router.navigate([route]);
  }

}





