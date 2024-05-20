import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateIntervalPickerComponent } from './date-interval-picker.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DateIntervalPickerComponent', () => {
  let component: DateIntervalPickerComponent;
  let fixture: ComponentFixture<DateIntervalPickerComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DateIntervalPickerComponent>>;

  beforeEach(async () => {
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        DateIntervalPickerComponent,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatButtonModule,
        HttpClientModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,        
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpyObj },
        { provide: MAT_DIALOG_DATA, useValue: { startDate: '', endDate: '' } }
      ]
    })
    .compileComponents();

    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<DateIntervalPickerComponent>>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateIntervalPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('close the dialog on cancel', () => {
    component.onCancel();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('dates when checkbox is checked', () => {
    component.dateForm.controls['all'].setValue(true);
    const dataValues = component.getDataValues(true);
    expect(dataValues).toEqual(JSON.stringify({ start: '', end: '' }));
  });

  it('dates when checkbox is not checked', () => {
    const testData = { start: '2024-05-20', end: '2024-05-25',"all":"" };
    component.dateForm.patchValue(testData);
    const dataValues = component.getDataValues(false);
    expect(dataValues).toEqual(JSON.stringify(testData));
  });






});
