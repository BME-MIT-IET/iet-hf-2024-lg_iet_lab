import { Component, QueryList,ViewChildren } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { DatasetService } from '../dataset.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GraphEnum } from '../enums/graphs';
import { ChartComponent } from '../chart/chart.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
import { MatDialog } from '@angular/material/dialog';
import { DateIntervalPickerComponent } from '../date-interval-picker/date-interval-picker.component';
import { PopUpWindowComponent } from '../pop-up-window/pop-up-window.component';

@Component({
  selector: 'app-dataset-graph',
  standalone: true,
  providers: [ ],
  imports: [
    BaseChartDirective, 
    CommonModule, 
    RouterLink,
    RouterLinkActive,
    ChartComponent,
    MatToolbarModule,
    MatIconButton,
    MatIconModule,
    ProgressSpinnerComponent,
  ],
  templateUrl: './dataset-graph.component.html',
  styleUrl: './dataset-graph.component.scss'
})
export class DatasetGraphComponent {

	constructor(
		private datasetService : DatasetService, 
		private route:ActivatedRoute, 
		private dialog:MatDialog,
		private router : Router,) {}

	@ViewChildren('graphs', {read: ChartComponent})
	charts! : QueryList<ChartComponent>;

	resourceName : string = 'Adatpont grafikonok';
	resourceId : number = -1;
	resourceKeys : string[] = [];
	intervalFormDisplayed : boolean = false;
	progressSpinnerDisplayed = false;
	private startDate! : string;
	private endDate! : string;
	getAllValues = false;

	chartComponents : {inputs: Record<string, any>, data: {date: string, value: number}[], chart: ChartComponent | null}[] = [
	{
		inputs: {title:'Hőmérséklet grafikon', beforeLabelText : "Hőmérséklet", unitOfMeasure: "C°", yAxisLabel: "C°",canvasId: 0},
		data: [],
		chart: null
	},
	{
		inputs: {title:'Páratartalom mértéke', beforeLabelText : "Páratartalom", unitOfMeasure: "%", yAxisLabel: "%",canvasId: 1},
		data: [],
		chart: null
	},
	{
		inputs: {title:'Szénmonoxid szint', beforeLabelText : "CO szint", unitOfMeasure: "", yAxisLabel: "Szénonoxid szint",canvasId: 2},
		data: [],
		chart: null
	},
	{
		inputs: {title:'Talajnedveség mértéke', beforeLabelText : "Talajnedvesség", unitOfMeasure: "%", yAxisLabel: "%",canvasId: 3},
		data: [],
		chart: null
	},
	{
		inputs: {title:'Talajhőmérséklet grafikon', beforeLabelText : "Talajhőmérséklet", unitOfMeasure: "C°", yAxisLabel: "C°",canvasId: 4},
		data: [],
		chart: null
	},
	];


	/**
	 * Converts a Date object to a string in 'YYYY-MM-DD' format.
	 * 
	 * @param {Date} dateIn - The Date object to be converted.
	 * @returns {string} Returns the date string in the format 'YYYY-MM-DD'.
	 */
	convertDateToString(dateIn : Date) : string
	{
		return dateIn.getFullYear()+
		'-'+((dateIn.getMonth()+1) < 10 ? '0'+(dateIn.getMonth()+1) : (dateIn.getMonth()+1))+
		'-'+(dateIn.getDate() < 10 ? ('0'+dateIn.getDate()) : dateIn.getDate());
	}

	/**
	 * This function sets the start date as 7 days before the current day and the
	 * end date as today, then extracts the resource ID, and resource's name from
	 * the route snapshot parameters.
	 * 
	 * @returns {void}
	 */
	ngOnInit()
	{

		this.endDate = this.convertDateToString(new Date());
		this.startDate = this.convertDateToString(new Date((new Date().getTime()-604800000)));
		
		this.resourceId = Number(this.route.snapshot.paramMap.get("id"));
		let nameParam = String(this.route.snapshot.paramMap.get("resourceName"))
		if(nameParam != 'null')
			this.resourceName = nameParam;
	}

	/**
	 * This function initializes the chart components by assigning the corresponding
	 * chart instances from the array of chart elements retrieved using the ViewChildren
	 * decorator. It then sets the maximum and minimum Y-axis values for specific chart components.
	 * 
	 * After initializing the chart components, it triggers the function to retrieve chart data
	 * within the date interval set in the ngOnInit() function.
	 * 
	 * @returns {void}
	 */
	ngAfterViewInit(){
		let chartArray = this.charts.toArray();
		for(let i = 0; i < this.chartComponents.length; ++i)
		{
			this.chartComponents[i].chart = chartArray[i];
		}
		this.chartComponents[GraphEnum.humidity].chart?.setMaxY(100);
		this.chartComponents[GraphEnum.humidity].chart?.setMinY(0);
		this.chartComponents[GraphEnum.colevel].chart?.setMinY(0);
		this.chartComponents[GraphEnum.soilmoisture].chart?.setMaxY(100);
		this.chartComponents[GraphEnum.soilmoisture].chart?.setMinY(0);
		this.getChartDataDateInterval();
	}

	/**
	 * Opens the date picker dialog to select a date interval,
	 * it allows the user to select a start and end date for a specific date interval
	 * or select all the datasets for the specific resource from which this component was opened.
	 *  
	 * After the dialog is closed, it parses the result and assigns it to
	 * the component's start and end date properties accordingly,
	 * and then triggers the function to retrieve chart data within the selected date interval.
	 * 
	 * @returns {void}
	 */
	openDatePickerDialog()
	{
		let dateDialogRef = this.dialog.open(DateIntervalPickerComponent, {data: {startDate : this.startDate,endDate: this.endDate}});
		dateDialogRef.afterClosed().subscribe((result) => {
			let resJson = JSON.parse(result);
			this.startDate = resJson['start'].split('T')[0];
			this.endDate = resJson['end'].split('T')[0];
			this.getChartDataDateInterval();
		});
	}

	/**
	 * Retrieves data for the charts within a specified date interval.
	 * 
	 * It then populates the data arrays of each chart component
	 * with the datasets within the specified date range.
	 * 
	 * Once the data is retrieved and processed, it updates the data for each chart component.
	 * 
	 * Handles errors by displaying a pop-up window with an error message and redirects to the homepage.
	 * 
	 * @returns {void}
	 */
	getChartDataDateInterval()
	{
		
		let dateStart = this.startDate;
		let dateEnd = this.endDate;
		
		this.datasetService.getDataSetBySpecificDate(this.resourceId,dateStart,dateEnd).subscribe({
		next: (dataarray) =>
		{
			this.chartComponents.forEach(chart => chart.data = [])
			for(const element of dataarray)
			{
				this.chartComponents[GraphEnum.temperature].data.push({date: element.dataObserved, value: element.temperature});
				this.chartComponents[GraphEnum.humidity].data.push({date: element.dataObserved, value: element.humidity});
				this.chartComponents[GraphEnum.soilmoisture].data.push({date: element.dataObserved, value: element.soilMoisture});
				this.chartComponents[GraphEnum.soiltemp].data.push({date: element.dataObserved, value: element.soilTemperature});
				this.chartComponents[GraphEnum.colevel].data.push({date: element.dataObserved, value: element.coLevel});
			}
			for(const element of this.chartComponents)
			{
				element.chart?.setData(element.data);
			}
		},
		error: (err)=> {
			let dialogRefError = this.dialog.open(PopUpWindowComponent, {
			data: {
			title: err,
			body: "A kért gombaház nem található az adatbázisban!",
			buttonConfirmText: "a főoldalra",
			hasCancel : false,
			buttonCancelText : ""}});
			dialogRefError.afterClosed().subscribe(() => {
				this.progressSpinnerDisplayed = true;
				this.router.navigate(['../resources/']);
				dialogRefError.close();
			});
		}
		});
	}
}
