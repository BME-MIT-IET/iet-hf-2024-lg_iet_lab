import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DatasetListComponent } from './dataset-list.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { DatasetService } from '../dataset.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('DatasetListComponent', () => {
  let component: DatasetListComponent;
  let fixture: ComponentFixture<DatasetListComponent>;
  let mockDatasetService: jasmine.SpyObj<DatasetService>;



  beforeEach(waitForAsync(() => {
    mockDatasetService = jasmine.createSpyObj('DatasetService', ['getDatasetForResource']);

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
