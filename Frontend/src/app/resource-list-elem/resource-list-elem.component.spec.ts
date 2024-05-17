import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ResourceListElemComponent } from './resource-list-elem.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ResourceService } from '../resource.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

describe('ResourceListElemComponent', () => {
  let component: ResourceListElemComponent;
  let fixture: ComponentFixture<ResourceListElemComponent>;
  let resourceService: jasmine.SpyObj<ResourceService>;
  let matDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(waitForAsync(() => {
    const resourceServiceSpy = jasmine.createSpyObj('ResourceService', ['deleteResource']);
    const matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    
    TestBed.configureTestingModule({
      imports: [
        ResourceListElemComponent,
        MatDialogModule,
        NoopAnimationsModule,
        CommonModule,
        MatIconModule,
        MatExpansionModule,
        RouterModule.forRoot([]),
        MatButtonModule
      ],
      providers: [
        { provide: ResourceService, useValue: resourceServiceSpy },
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: ActivatedRoute, useValue: {} }
      ],
    }).compileComponents();

    resourceService = TestBed.inject(ResourceService) as jasmine.SpyObj<ResourceService>;
    matDialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceListElemComponent);
    component = fixture.componentInstance;
    component.resource = { id: 1, name: 'Test Resource' } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('modifyElement is called', () => {
    spyOn(component.modify, 'emit');
    component.modifyElement();
    expect(component.modify.emit).toHaveBeenCalled();
  });

 
  it('navigateToData is called', () => {
    spyOn(component.navigate, 'emit');
    component.navigateToData();
    expect(component.navigate.emit).toHaveBeenCalled();
  });

  it('header-title with resource name ', () => {
    const bannerElement: HTMLElement = fixture.nativeElement;
    const matPanelTitle = bannerElement.querySelector('.header-title')!;
    expect(matPanelTitle.textContent).toContain('Test Resource');
  });



});
