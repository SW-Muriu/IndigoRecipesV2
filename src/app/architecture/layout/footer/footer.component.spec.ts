import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { NotificationService } from '../../services/notification/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../modules/shared.module';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let snackbarMock: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, BrowserAnimationsModule, SharedModule], 
      providers: [
        {
          provide: NotificationService, 
          useValue: {
            showNotificationMessage: jest.fn(),
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterComponent);
    snackbarMock = TestBed.inject(NotificationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get username and notify user when response field is not null', () => {
    const username = sessionStorage.getItem('username');
    component.mngForm.setValue({response: "Test Response"});

    //Triger run 
    component.onSendEmail();

    //Assert 
    expect(snackbarMock.showNotificationMessage).toHaveBeenCalledWith(`Thank you ${username} for your feedback`, 'snackbar-success');
  }); 
});
