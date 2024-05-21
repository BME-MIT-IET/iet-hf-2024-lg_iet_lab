import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopUpWindowComponent, PopupData } from './pop-up-window.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PopUpWindowComponent', () => {
  let component: PopUpWindowComponent;
  let fixture: ComponentFixture<PopUpWindowComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<PopUpWindowComponent>>;
  const mockData: PopupData = {
    title: 'Test Title',
    body: 'Test Body',
    buttonConfirmText: 'Confirm',
    hasCancel: true,
    buttonCancelText: 'Cancel'
  };

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatDialogModule, MatButtonModule,
        CommonModule, 
        SnackbarComponent,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        HttpClientModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,        
        PopUpWindowComponent
      ],

      providers: [
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: MatDialogRef, useValue: mockDialogRef }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initialize data', () => {
    expect(component.title).toBe(mockData.title);
    expect(component.body).toBe(mockData.body);
    expect(component.btnConfirmText).toBe(mockData.buttonConfirmText);
    expect(component.hasCancel).toBe(mockData.hasCancel);
    expect(component.btnCancelText).toBe(mockData.buttonCancelText);
  });


  it('close dialog with confirm', () => {
    const confirmButton = fixture.debugElement.query(By.css('.confirm-button')).nativeElement;
    confirmButton.click();

    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('close dialog with cancel', () => {
    component.hasCancel = true;
    fixture.detectChanges();
    
    const cancelButton = fixture.debugElement.query(By.css('.cancel-button')).nativeElement;
    cancelButton.click();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
