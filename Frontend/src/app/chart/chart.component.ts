import { Component,ElementRef,Input, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType, TooltipItem, ChartItem } from 'chart.js';
import { Chart } from 'chart.js/auto';
import { min } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {

	@ViewChild('chartCanvas',{read: ElementRef})
	chartCanvas! : ElementRef;

	@Input() title :string = "Test title";
	@Input() beforeLabelText :string = "test";
	@Input() unitOfMeasure :string = "test";
	@Input() yAxisLabel : string = "test";
	private data : {date: string, value: number}[] = [];
	private chart! : Chart;
	private config : any = {};

	/** Lifecycle hook that is called after Angular has fully initialized a component's view 
	 * 	
	 * This function configures the chart and sets its default properties some of which
	 * can be changed.
	 * 
	 *  @returns {void}
	*/ 
	ngAfterViewInit()
	{
		this.config =  {
		type: 'line',
		options:
		{
			responsive : true,
			plugins:
			{
			legend:
			{
				display : false,
			},
			tooltip:
			{
				enabled : true,
				displayColors : false,
				callbacks:
				{
				beforeTitle : (items : TooltipItem<'line'>[]) => 
				{
					
					return 'Megfigyelés ideje:';
				},
				beforeLabel: (item: TooltipItem<'line'>) => 
				{
					return this.beforeLabelText+":";
				},
				label : (item : TooltipItem<'line'>) => 
				{
					return item.formattedValue+" "+ this.unitOfMeasure; 
		
				},
				}
			},
			},
			elements: 
			{
			line:
			{
				showLine: true,
				borderColor : 'rgba(230,11,11,1)',
			},
			point:
			{
				borderColor : 'rgba(0,0,0,0.5)',
				backgroundColor : 'rgba(230,11,11,1)',
				pointStyle : 'rect',
				pointRadius: 5,
				pointHoverRadius: 8
			}
			},
			scales: 
			{
			y:
			{
				display: true,
				title : 
				{
					display: true,
					text: this.unitOfMeasure,
				},
				}
			},
			aspectRatio:1,
			maintainAspectRatio: false,
		},
		data:{
			datasets : [{
			label: this.title,
			data: this.data,
			parsing: {
			xAxisKey : 'date',
			yAxisKey : 'value'
			}
		}]}
		};
		this.chart = new Chart(<ChartItem>this.chartCanvas.nativeElement,this.config);
	}

	
  	/**
   	* Sets new data for the chart.
   	* 
   	* @param dataSet New dataset array to be displayed on the chart.
   	* @returns {void}
   	*/
	setData(dataSet : {date: string, value: number}[]) : void
	{
		this.config.data.datasets[0].data = dataSet;
		this.chart.update();
	}

	/**
   	* Clears the chart data and resets the chart.
   	* 
   	* @returns {void}
   	*/
	clearData() : void
	{
		this.chart.destroy();
		this.config.data.labels.pop();
		this.chart.data.datasets[0].data = [];
		this.chart = new Chart(<ChartItem>this.chartCanvas.nativeElement,this.config);
		this.chart.update();
	}

	/**
   	* Sets the line color of the chart.
   	* 
   	* @param color The color to be set for the chart line.
   	* @returns {void}
   	*/
	setLineColor(color : string){
		this.config.options.elements.line.borderColor = color;
	}

	/**
   	* Sets the point color of the chart.
   	* 
   	* @param color The color to be set for the chart points.
   	* @returns {void}
   	*/
	setPointColor(color: string){
		this.config.options.elements.point.borderColor = color;
	}

	/**
	 * Sets the minimum value for the Y-axis of the chart.
	 * 
	 * @param minimum The minimum value to be set for the Y-axis.
	 * @returns {void}
	 */
	setMinY(minimum : number)
	{
		this.config.options.scales.y.min = minimum;
	}

	/**
	 * Sets the maximum value for the Y-axis of the chart.
	 * 
	 * @param maximum The maximum value to be set for the Y-axis.
	 * @returns {void}
	 */
	setMaxY(maximum: number)
	{
		this.config.options.scales.y.max = maximum;
	}

	/**
	 * Retrieves the current configuration of the chart.
	 * 
	 * @returns {any} The current configuration object of the chart.
	 */
	getConfig() : any{
		return this.config;
	}
}
