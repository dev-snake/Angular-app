import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupOrdersComponent } from './lookup-orders.component';

describe('LookupOrdersComponent', () => {
  let component: LookupOrdersComponent;
  let fixture: ComponentFixture<LookupOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LookupOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LookupOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
