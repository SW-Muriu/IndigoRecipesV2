import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileManagementComponent } from './profile-management.component';
import { SharedModule } from '../../../architecture/modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProfileManagementComponent', () => {
  let component: ProfileManagementComponent;
  let fixture: ComponentFixture<ProfileManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileManagementComponent, SharedModule, BrowserAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
