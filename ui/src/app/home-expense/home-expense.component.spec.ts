import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeExpenseComponent } from './home-expense.component';

describe('HomeExpenseComponent', () => {
  let component: HomeExpenseComponent;
  let fixture: ComponentFixture<HomeExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeExpenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
