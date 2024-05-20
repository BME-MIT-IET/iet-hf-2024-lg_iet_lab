import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResourceFormComponent } from './resource-form.component';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ResourceFormComponent', () => {
  let component: ResourceFormComponent;
  let fixture: ComponentFixture<ResourceFormComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ ResourceFormComponent, MatDialogModule ,
            CommonModule, 
            SnackbarComponent,
            MatDialogModule,
            MatButtonModule,
            MatFormFieldModule,
            MatInputModule,
            HttpClientModule,
            NoopAnimationsModule,
            BrowserAnimationsModule,        
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} }, 
        { provide: MAT_DIALOG_DATA, useValue: {} } 
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  beforeEach(() => {
    component.resourceId = 12;
    component.buttonText = 'button_text_test';
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('default values check', () => {
    
    expect(component.resourceId).toEqual(12);
    expect(component.buttonText).toEqual('button_text_test');
    expect(component.resourceForm).toBeTruthy();
  });

  it('ngOnInit Test', () => {
    component.ngOnInit();
    expect(component.buttonText).toEqual('SZERKESZT');
    expect(component.resourceId).toEqual(component.data.id);
    expect(component.data.description).toEqual(component.data.description);
    
  });

  it('onSave if not modifying', () => {
    spyOn(component, 'saveResource');
    component['modifying'] = false;
    component.onSave();
    expect(component.saveResource).toHaveBeenCalled();
  });

  it('onSave if modifying', () => {
    spyOn(component, 'modifyResource');
    component['modifying'] = true;
    component.onSave();
    expect(component.modifyResource).toHaveBeenCalled();
  });


});
