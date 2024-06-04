import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVoucherComponent } from './my-voucher.component';

describe('MyVoucherComponent', () => {
  let component: MyVoucherComponent;
  let fixture: ComponentFixture<MyVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyVoucherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
