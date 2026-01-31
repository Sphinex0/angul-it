import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MathCardComponent } from './math-card.component';

describe('MathCardComponent', () => {
  let component: MathCardComponent;
  let fixture: ComponentFixture<MathCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MathCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MathCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
