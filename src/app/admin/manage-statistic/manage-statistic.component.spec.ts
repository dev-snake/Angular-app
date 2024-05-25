import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStatisticComponent } from './manage-statistic.component';

describe('ManageStatisticComponent', () => {
  let component: ManageStatisticComponent;
  let fixture: ComponentFixture<ManageStatisticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageStatisticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
