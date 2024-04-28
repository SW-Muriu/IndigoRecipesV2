import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeviewerComponent } from './recipeviewer.component';

describe('RecipeviewerComponent', () => {
  let component: RecipeviewerComponent;
  let fixture: ComponentFixture<RecipeviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeviewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
