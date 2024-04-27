import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeHolderComponent } from './recipe-holder.component';

describe('RecipeHolderComponent', () => {
  let component: RecipeHolderComponent;
  let fixture: ComponentFixture<RecipeHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeHolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipeHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
