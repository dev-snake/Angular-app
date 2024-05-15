import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrderDetailsComponent } from './view-order-details.component';

describe('ViewOrderDetailsComponent', () => {
  let component: ViewOrderDetailsComponent;
  let fixture: ComponentFixture<ViewOrderDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOrderDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
