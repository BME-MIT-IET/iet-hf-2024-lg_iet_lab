import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressSpinnerComponent } from './progress-spinner.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';

describe('ProgressSpinnerComponent', () => {
  let component: ProgressSpinnerComponent;
  let fixture: ComponentFixture<ProgressSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatProgressSpinnerModule, ProgressSpinnerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default value for displayed', () => {
    expect(component.displayed).toBe(false);
  });

  it('set input', () => {
    component.displayed = true;
    fixture.detectChanges();
    expect(component.displayed).toBe(true);
  });

  it(' spinner when true', () => {
    component.displayed = true;
    fixture.detectChanges();

    const spinnerElement = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinnerElement).toBeTruthy();
  });

  it('spinner when false', () => {
    component.displayed = false;
    fixture.detectChanges();

    const spinnerElement = fixture.debugElement.query(By.css('mat-progress-spinner'));
    expect(spinnerElement).toBeFalsy();
  });
});
