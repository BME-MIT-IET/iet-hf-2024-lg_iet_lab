	import { CommonModule } from '@angular/common';
	import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
	import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
	import { MatIconModule } from '@angular/material/icon';
	import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
	import { PopUpWindowComponent } from '../pop-up-window/pop-up-window.component';
	import { ResourceService } from '../resource.service';
	import { Resource } from '../models/resource';
	import { MatButton } from '@angular/material/button';
	import { MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-resource-list-elem',
	standalone: true,
	imports: [
		CommonModule, 
		MatIconModule, 
		MatExpansionModule, 
		MatAccordion,
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
		PopUpWindowComponent,
		MatButton,
	],
	templateUrl: './resource-list-elem.component.html',
	styleUrl: './resource-list-elem.component.scss'
})
export class ResourceListElemComponent {

	constructor(private resourceService : ResourceService,
	private dialog: MatDialog
	) {}

	@Input({required: true}) resource! : Resource

	/**
	 * Deletes the current resource element after confirmation.
	 * 
	 * Opens a dialog window to confirm the deletion of the resource.
	 * If confirmed, the resource is deleted using the ResourceService.
	 * 
	 * After that the removed event is emitted which will trigger the snackbar in the ResourceListComponent.
	 * 
	 * Displays an error pop-up window if there is an error during deletion.
	 * 
	 * @returns {void}
	 */
	deleteElement()
	{
		let dialogRef = this.dialog.open(PopUpWindowComponent,{ data : {
			
			title: this.resource.name + " törlése",
			body: "Biztosan szeretné törölni ezt az elemet?",
			buttonConfirmText: "Törlés",
			hasCancel : true,
			buttonCancelText : "Mégse",
		}});

		dialogRef.componentInstance.confirm.subscribe(() =>{
			this.resourceService.deleteResource(this.resource.id).subscribe({
				next: (data) => {
					this.removed.emit();
					dialogRef.close();
				},
				error: (err) => {
					let dialogRefError = this.dialog.open(PopUpWindowComponent, {data: {
						title: err,
						body: "Kérjük próbálja meg később!",
						buttonConfirmText: "RENDBEN",
						hasCancel : false,
						buttonCancelText : ""}});
						dialogRefError.componentInstance.confirm.subscribe(() => {
							dialogRefError.close();
							dialogRef.close();
						})
				}	
			});
		})
	}

	/**
	 * Emits an event that modification was requested for the current resource element.
	 * 
	 * @returns {void}
	 */
	modifyElement()
	{
		this.modify.emit();
	}

	/**
	 * Emits an event to navigate to the datasets related to the current resource element.
	 * 
	 * @returns {void}
	 */
	navigateToData()
	{
		this.navigate.emit();
	}

	@Output() removed = new EventEmitter<any>();
	@Output() modify = new EventEmitter<any>();
	@Output() navigate = new EventEmitter<any>();
}
