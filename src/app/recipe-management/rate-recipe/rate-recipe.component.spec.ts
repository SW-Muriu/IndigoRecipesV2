import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateRecipeComponent } from './rate-recipe.component';

describe('RateRecipeComponent', () => {
  let component: RateRecipeComponent;
  let fixture: ComponentFixture<RateRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RateRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
