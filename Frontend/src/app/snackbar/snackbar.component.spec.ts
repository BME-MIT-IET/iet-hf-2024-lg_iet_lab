import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarComponent } from './snackbar.component';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatSnackBarModule, SnackbarComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('default values', () => {
    expect(component.text).toBe('Sample text');
    expect(component.hasBtn).toBe(false);
    expect(component.open).toBe(false);
  });

  it('set input', () => {
    component.text = 'Test text';
    component.hasBtn = true;
    fixture.detectChanges();

    expect(component.text).toBe('Test text');
    expect(component.hasBtn).toBe(true);
  });

  it('display snackbar', (done) => {
    component.displaySnackBar(1); 
    fixture.detectChanges();

    expect(component.open).toBe(true);

    setTimeout(() => {
      fixture.detectChanges();
      expect(component.open).toBe(false);
      done();
    }, 1000);
  });


  it('hasbutton false', () => {
    component.hasBtn = false;
    component.displaySnackBar(1);
    fixture.detectChanges();

    const buttonElement = fixture.debugElement.query(By.css('.snackbar-button'));
    expect(buttonElement).toBeFalsy();
  });
});

