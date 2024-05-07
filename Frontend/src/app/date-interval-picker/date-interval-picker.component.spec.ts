import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateIntervalPickerComponent } from './date-interval-picker.component';

describe('DateIntervalPickerComponent', () => {
  let component: DateIntervalPickerComponent;
  let fixture: ComponentFixture<DateIntervalPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateIntervalPickerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DateIntervalPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
