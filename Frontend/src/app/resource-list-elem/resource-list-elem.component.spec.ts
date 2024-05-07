import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceListElemComponent } from './resource-list-elem.component';

describe('ResourceListElemComponent', () => {
  let component: ResourceListElemComponent;
  let fixture: ComponentFixture<ResourceListElemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceListElemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResourceListElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
