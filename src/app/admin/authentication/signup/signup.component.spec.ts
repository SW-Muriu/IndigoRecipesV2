import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../architecture/services/notification/notification.service';
import { AuthService } from '../../services/authservices/auth.service';
import { RecipeService } from '../../../recipe-management/services/recipe.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let recipeManService: RecipeService;
  let snackbarManService: NotificationService;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SignupComponent,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        { provide: Router, useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: NotificationService, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    recipeManService = TestBed.inject(RecipeService);
    snackbarManService = TestBed.inject(NotificationService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
