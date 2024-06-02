import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVoucherComponent } from './manage-voucher.component';

describe('ManageVoucherComponent', () => {
  let component: ManageVoucherComponent;
  let fixture: ComponentFixture<ManageVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageVoucherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
