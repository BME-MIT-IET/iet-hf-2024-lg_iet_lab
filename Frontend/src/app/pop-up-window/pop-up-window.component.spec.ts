import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpWindowComponent } from './pop-up-window.component';

describe('PopUpWindowComponent', () => {
  let component: PopUpWindowComponent;
  let fixture: ComponentFixture<PopUpWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
