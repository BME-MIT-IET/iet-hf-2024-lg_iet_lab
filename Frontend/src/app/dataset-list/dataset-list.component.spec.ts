import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DatasetListComponent } from './dataset-list.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DatasetService } from '../dataset.service';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { PopUpWindowComponent } from '../pop-up-window/pop-up-window.component';
import { HttpClientModule } from '@angular/common/http';

describe('DatasetListComponent', () => {
  let component: DatasetListComponent;
  let fixture: ComponentFixture<DatasetListComponent>;
  let mockDatasetService: jasmine.SpyObj<DatasetService>;
  let mockRouter: Router;



  beforeEach(waitForAsync(() => {
    mockDatasetService = jasmine.createSpyObj('DatasetService', ['getDatasetForResource']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({

      imports: [
        DatasetListComponent,
        ProgressSpinnerComponent,
        ReactiveFormsModule,
        MatDialogModule,
        MatTableModule,
        MatSortModule,
        MatToolbarModule,
        MatIconModule,
        NoopAnimationsModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: DatasetService, useValue: mockDatasetService },
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({ id: 1, resourceName: 'Test Resource' }))
            
          }
        }

      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngafterViewInit test', () => {
    component.ngAfterViewInit();

    expect(mockDatasetService.getDatasetForResource).toHaveBeenCalledWith(1);
    expect(component.progressSpinnerDisplayed).toBeTruthy();
  });


  it('navigategraphs test', () => {
    component.navigateToGraphs();

    expect(component.progressSpinnerDisplayed).toBeTruthy();
  });


});
