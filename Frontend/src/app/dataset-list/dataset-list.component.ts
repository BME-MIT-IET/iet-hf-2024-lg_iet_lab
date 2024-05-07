import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLinkActive,RouterLink, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Dataset } from '../models/dataset';
import { DatasetService } from '../dataset.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
import {ReactiveFormsModule, FormGroup} from '@angular/forms';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { PopUpWindowComponent } from '../pop-up-window/pop-up-window.component';

@Component({
	selector: 'app-dataset-list',
	standalone: true,
	imports: [
	RouterLink,
	RouterLinkActive,
	CommonModule,
	ReactiveFormsModule,
	MatTableModule,
	MatSortModule,
	ProgressSpinnerComponent,
	MatToolbarModule,
	MatIconButton,
	MatIconModule
	],
	templateUrl: './dataset-list.component.html',
	styleUrl: './dataset-list.component.scss'
})
export class DatasetListComponent {
	constructor(
	private route : ActivatedRoute,
	private router : Router,
	private datasetService : DatasetService,
	private dialog : MatDialog,
	private cd: ChangeDetectorRef
	){}

	resourceId : number = -1;
	resourceName : string = 'Adatpontok megjelenítése';
	datasets : MatTableDataSource<Dataset> = new MatTableDataSource<Dataset>();
	sortingDirection : number = 0;
	sortAttribute : string = 'dataObserved';
	filterFormDisplayed: boolean = false;
	displayedColumns = ['dataObserved','temperature','humidity','coLevel','soilMoisture','soilTemperature'];
	progressSpinnerDisplayed = true;
	error : boolean = false;
	filterForm! :FormGroup

	@ViewChild(MatSort) sort!: MatSort;
	@ViewChild('backButton') backBtn! : ElementRef<HTMLButtonElement>;
	
	/**
	 * This function extracts the resource ID and resource name from the route URL. 
	 * It then retrieves all the datasets associated with the specified resource ID from the dataset service
	 * and then converts the data to the appropriate format for displaying.
	 * 
	 * Handles errors by displaying a pop-up window with an error message and redirects to the homepage.
	 * 
	 * @returns {void}
	 */
	ngAfterViewInit()
	{
		this.route.paramMap.pipe(
			switchMap((params) => {
				this.resourceId = Number(params.get("id"));
				let nameParam = String(params.get('resourceName'));
				if(nameParam != 'null')
					this.resourceName = nameParam;
				return this.datasetService.getDatasetForResource(this.resourceId);
			}))
			.subscribe({
				next: (data) => {
					let datasetArray : Dataset[] = [];
					for(let i = 0; i < data.length; ++i)
					{
						const dateToConvert : Date = new Date(data[i].dataObserved);
						const splitByYMD = dateToConvert.toISOString().split('T');
						const splitByHMS = splitByYMD[1].split('.')[0];
						const convertedConcetanatedDate = splitByYMD[0] + " " + splitByHMS;
						data[i].dataObserved = convertedConcetanatedDate;
						datasetArray.push(data[i]);
					}
					this.datasets.data = datasetArray;
					this.progressSpinnerDisplayed = false;
				},
				error: (err) => {
					this.error = true;
					let dialogRefError = this.dialog.open(PopUpWindowComponent, {
						data: {
						title: err,
						body: "A kért gombaház nem található az adatbázisban!",
						buttonConfirmText: "a főoldalra",
						hasCancel : false,
						buttonCancelText : ""}});
						dialogRefError.afterClosed().subscribe(() => {
							this.progressSpinnerDisplayed = true;
							this.router.navigate(['/resources/']);
							dialogRefError.close();
						});
				}
		});
		this.datasets.sort = this.sort;
		this.cd.detectChanges();
	}

	/**
	* Checks the length of the dataset to ensure it contains data entries.
	* 
	* @returns {boolean} Returns true if the dataset contains at least one data entry, otherwise returns false.
	*/
	private datasetLenghtCheck() : boolean
	{
		return this.datasets.data.length > 0;
	}

	/**
	* Exports the datasets of the selected resource to a CSV file.
	* 
	* This function first checks if the dataset length meets the required criteria before proceeding.
	* If the dataset length check fails, the function exits early without performing any further actions.
	* 
	* After passing the dataset length check, it constructs the CSV content with the resource's properties, 
	* then prepares it for download and also intiates it.
	*  
	* @returns {void}
	*/
	exportDataToCsv()
	{
		if(!this.datasetLenghtCheck())
		return;

		let csvContent = this.resourceName+" ház adatrekordjai\n";
		csvContent += "Megfigyelés dátuma;Hőmérséklet;Páratartalom;CO Szint;Talajnedvesség;Talajhőmérséklet\n"
		for(let i = 0; i < this.datasets.data.length; ++i)
		{
			csvContent += 
			this.datasets.data[i].dataObserved + ";" +
			this.datasets.data[i].temperature + ";" +
			this.datasets.data[i].humidity + ";" +
			this.datasets.data[i].coLevel + ";"+
			this.datasets.data[i].soilMoisture + ";" +
			this.datasets.data[i].soilTemperature + "\n";
		}
		const csvFile = new Blob([ new Uint8Array([0xEF,0xBB,0xBF]),csvContent], {type: "text/csv;charset=utf8"});
		const objUrl = URL.createObjectURL(csvFile);
		open(objUrl);
	}

	/**
	 * Navigates to the graphs page for the selected resource dataset.
	 * 
	 * This function checks if the dataset length meets the required criteria before proceeding.
	 * If the dataset length check fails, the function exits early.
	 * 
	 * Once the dataset length check passes, it sets the progress spinner to be displayed,
	 * indicating that the navigation process is in progress.
	 * 
	 * After that, it navigates to the graphs page with the resource ID and name in the URL.
	 * 
	 * @returns {void}
	 */
	navigateToGraphs()
	{
		if(!this.datasetLenghtCheck())
		return;

		this.progressSpinnerDisplayed = true;
		this.router.navigate(['/resources/'+this.resourceId+'/datasets/graphs',{resourceName: this.resourceName}]);
	}
}
