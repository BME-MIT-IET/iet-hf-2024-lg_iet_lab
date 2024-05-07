import { Component, Inject, Input, ViewChild } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';


const DATE_FORMAT = {
	parse: { 
		dateInput: 'YYYY-MM-DD'
	},
	display: {
		dateInput: 'YYYY/MM/DD',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY'
	}
}

@Component({
selector: 'app-date-interval-picker',
standalone: true,
providers: [provideMomentDateAdapter(DATE_FORMAT)],
imports: [
	CommonModule,
	ReactiveFormsModule,   
	MatDatepickerModule,
	MatFormFieldModule,
	MatDialogModule,
	MatCheckboxModule,
	MatButtonModule,
	JsonPipe
],
templateUrl: './date-interval-picker.component.html',
styleUrl: './date-interval-picker.component.scss'
})
export class DateIntervalPickerComponent {

	maxDate! : Date;

	constructor(
		public dialogRef : MatDialogRef<DateIntervalPickerComponent>,
		@Inject(MAT_DIALOG_DATA) public data : {startDate: string, endDate: string}){
		this.maxDate = new Date();
	}

	dateForm : FormGroup = new FormGroup({
		start: new FormControl({value: this.data.startDate, disabled: false}), 
		end: new FormControl({value: this.data.endDate, disabled: false}),
		all: new FormControl(''),
	});

	/**
	 * Retrieves the selected date values.
	 * 
	 * @param checkboxChecked Indicates if the 'all' form control assigned checkbox is checked.
	 * @returns {string} JSON string containing the selected start and end dates.
	 */
	getDataValues(checkboxChecked : boolean)
	{
		if(checkboxChecked)
			return JSON.stringify({start : '', end: ''});

		return JSON.stringify(this.dateForm.value);
	}

	/**
	 * Closes the dialog.
	 * 
	 * @returns {void}
	 */
	onCancel()
	{
		this.dialogRef.close();
	}

}
