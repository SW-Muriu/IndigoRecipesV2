import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from '../../../architecture/services/notification/notification.service';
import { AuthService } from '../../services/authservices/auth.service';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let fb: FormBuilder;
  let snackbarManService: NotificationService;
  let authManService: AuthService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninComponent, SharedModule, BrowserAnimationsModule],
      providers: [
        FormBuilder,
        { provide: NotificationService, useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: Router, useValue: {} }
]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
