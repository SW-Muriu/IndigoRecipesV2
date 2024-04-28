import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRecipeviewerComponent } from './multi-recipeviewer.component';

describe('MultiRecipeviewerComponent', () => {
  let component: MultiRecipeviewerComponent;
  let fixture: ComponentFixture<MultiRecipeviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiRecipeviewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultiRecipeviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
