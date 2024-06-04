import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangePointComponent } from './exchange-point.component';

describe('ExchangePointComponent', () => {
  let component: ExchangePointComponent;
  let fixture: ComponentFixture<ExchangePointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangePointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExchangePointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
