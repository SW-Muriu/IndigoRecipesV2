import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { SharedModule } from '../../modules/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormStyle } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, SharedModule, BrowserAnimationsModule],
      providers: [
        { provide: Router, useValue: {} },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call call onLogout fn', () => {
    //Mock
    const spy = jest.spyOn(component, 'onLogout');
    const mockRouter = { navigate: jest.fn() };
    const mockSessionStorage = { removeItem: jest.fn() };
    const spy2 = jest.spyOn(mockSessionStorage, 'removeItem');
    const spy3 = jest.spyOn(mockRouter, 'navigate');
    let route = `/#`;

    component.onLogout();

    // expect(spy).toHaveBeenCalled();
    // expect(spy2).toHaveBeenCalled();
    // expect(spy3).toHaveBeenCalled();
    // expect(router.navigate).toHaveBeenCalledWith([route]);
    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('username');
  })

  it('should navigate to the manage recipe route', () => {
    const mockRouter = { navigate: jest.fn() };
    const navigateSpy = jest.spyOn(mockRouter, 'navigate');

    expect(navigateSpy).toHaveBeenCalled();
    // expect(mockRouter.navigate).toHaveBeenCalledWith(['manage/recipe']);

  });


});
