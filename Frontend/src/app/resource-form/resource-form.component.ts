import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Resource } from '../models/resource';
import { FormControl,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { ResourceService } from '../resource.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PopUpWindowComponent } from '../pop-up-window/pop-up-window.component';

@Component({
selector: 'app-resource-form',
standalone: true,
imports: [
	CommonModule, 
	ReactiveFormsModule,
	SnackbarComponent,
	MatDialogModule,
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule
],
templateUrl: './resource-form.component.html',
styleUrl: './resource-form.component.scss'
})
export class ResourceFormComponent {

	resourceId : number = -1;
	buttonText : string = "HOZZÁAD";
	private modifying : boolean = false;

	@Output() dataadded = new EventEmitter<Resource>;
	@Output() datamodified = new EventEmitter<Resource>;

	constructor(private resourceService : ResourceService,
		private dialog: MatDialog,
	@Inject(MAT_DIALOG_DATA) public data: { id: number, name:string, address: string, size : string, description? : string, comment?:string}) {  }

	resourceForm : FormGroup =  new FormGroup(
	{
		name:  new FormControl('', [Validators.required, Validators.minLength(1)]),
		address: new FormControl('', [Validators.required, Validators.minLength(1)]),
		size: new FormControl('', [Validators.required, Validators.minLength(1)]),
		description: new FormControl(''),
		comment: new FormControl(''),
	});

	/**
	 * Lifecycle hook that is called after Angular has initialized the component.
	 * 
	 * If the input data is not null, it sets the button text to "SZERKESZT",
	 * indicating that the component is in modifying mode. It also sets the modifying flag to true,
	 * retrieves the resource ID from the input data, and initializes the form controls
	 * with the values from the input data.
	 * 
	 * @returns {void}
	 */
	ngOnInit(){
		if(this.data !== null)
		{
			this.buttonText = "SZERKESZT";
			this.modifying = true;
			this.resourceId = this.data.id;
			this.resourceForm.controls['name'].setValue(this.data.name);
			this.resourceForm.controls['address'].setValue(this.data.address);
			this.resourceForm.controls['size'].setValue(this.data.size);
			this.resourceForm.controls['description'].setValue(this.data.description === null ? "" : this.data.description);
			this.resourceForm.controls['comment'].setValue(this.data.comment === null ? "" : this.data.comment);
		}
	}

	/**
	 * Handles the save operation based on whether a resource is being modified or
	 * a new resource is being added.
	 * 
	 * If a resource is being modified it calls the 'modifyResource' method,
	 * otherwise, it calls the 'saveResource' method.
	 * 
	 * @returns {void}
	 */
	onSave()
	{
		if(this.modifying) this.modifyResource();
		else this.saveResource();
	}
	
	//TODO: recomment
	/**
	 * Saves a new resource with the data from the form.
	 * 
	 * This function creates a Resource object with the data from the form fields
	 * and sends a request to the resource service to add the new resource.
	 * 
	 * Upon successful addition, it emits the 'dataadded' event with the added resource data as parameter.
	 * 
	 * @returns {void}
	 */
	saveResource()
	{
		let resourceToAdd : Resource = new Resource(
			0,
			this.resourceForm.controls["name"].value,
			this.resourceForm.controls["address"].value,
			this.resourceForm.controls["size"].value,
			this.resourceForm.controls["description"].value,
			this.resourceForm.controls["comment"].value
		);
		this.resourceService.addResource(resourceToAdd).subscribe(
			{
				next:  (result) => {
					resourceToAdd.id = result.id;
					this.dataadded.emit(resourceToAdd);
				},
				error: (err) => {
					let dialogRefError = this.dialog.open(PopUpWindowComponent, {
						data: {
						title: err,
						body: "Kérjük próbálja meg később!",
						buttonConfirmText: "RENDBEN",
						hasCancel : false,
						buttonCancelText : ""}});
						dialogRefError.componentInstance.confirm.subscribe(() => {
							dialogRefError.close();
						});
				}
			});
	}

	/**
 	* Modifies an existing resource with the data from the form.
 	* 
 	* This function creates a Resource object with the updated data from the form fields
 	* and sends a request to the resource service to modify the resource.
 	* 
 	* Upon successful modification, it emits the 'datamodified' event with the modified resource data as parameter.
 	* 
	* Displays an error pop-up window if there is an error during modification.
	* 
 	* @returns {void}
 	*/
	modifyResource()
	{
		let resourceToModify : Resource = new Resource(
			this.resourceId,
			this.resourceForm.controls["name"].value,
			this.resourceForm.controls["address"].value,
			this.resourceForm.controls["size"].value,
			this.resourceForm.controls["description"].value,
			this.resourceForm.controls["comment"].value
		);
		this.resourceService.modifyResource(this.resourceId,resourceToModify).subscribe({
			 next: (result) => {
				this.datamodified.emit(resourceToModify);
			},
			error: (err) => {
				let dialogRefError = this.dialog.open(PopUpWindowComponent, {
					data: {
					title: err,
					body: "Kérjük próbálja meg később!",
					buttonConfirmText: "RENDBEN",
					hasCancel : false,
					buttonCancelText : ""}});
					dialogRefError.componentInstance.confirm.subscribe(() => {
						dialogRefError.close();
					});
			}
		});
	}
}
