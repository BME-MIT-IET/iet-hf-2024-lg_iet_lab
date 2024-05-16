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
    expect(component).toBeDefined();
  });



  /*
  //html teszt
  it('should have header-title with  the resource name ', () => {
    const testfixture = TestBed.createComponent(ResourceListElemComponent);
    testfixture.detectChanges();

    component.resource = {
      id: 1,
      name: 'Test Resource Name',
      address: 'Test Address',
      size: 'Test Size',
      description: 'Test Description',
      comment: 'Test Comment'
    };


    const bannerElement: HTMLElement = testfixture.nativeElement;
    const matPanelTitle = bannerElement.querySelector('.header-title')!;

    expect(matPanelTitle.textContent).toContain('Test Resource Name');
  });
  */
})