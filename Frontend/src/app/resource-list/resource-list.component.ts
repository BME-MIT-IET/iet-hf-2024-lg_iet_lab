import { Component, OnInit, ViewChild } from '@angular/core';
import { ResourceService } from '../resource.service';
import { Resource } from '../models/resource';
import { CommonModule } from '@angular/common';
import { ResourceFormComponent } from '../resource-form/resource-form.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton, MatButtonModule } from '@angular/material/button';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PopUpWindowComponent } from '../pop-up-window/pop-up-window.component';
import { ResourceListElemComponent } from '../resource-list-elem/resource-list-elem.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [
    CommonModule,
    ResourceFormComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    SnackbarComponent,
    PopUpWindowComponent,
    ResourceListElemComponent,
    MatToolbarModule,
    MatIconModule,
    MatIconButton,
    MatButtonModule,
	ProgressSpinnerComponent,
    ],
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.scss',
  animations: [
    trigger('state', [
      state('done', style({})),
      transition('* => done', [
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class ResourceListComponent implements OnInit{
    constructor(
        private resourceService : ResourceService,
        private dialog : MatDialog
    ) {}

   @ViewChild('snackbar') snackbarComp! : SnackbarComponent;
   @ViewChild('popup') popupWindowComp! : PopUpWindowComponent;
   @ViewChild('resourceForm') resourceFormComp! : ResourceFormComponent; 

    resources : Array<Resource> = [];
    selectedResource : Resource | null = null;
    sortDirectionUp : boolean = true;
	progressSpinnerDisplayed : boolean = true;
	order : number = 0;
	error : boolean = false;

    /**
     * Toggles the order between ascending, descending, and default.
     * 
     * If the current order is default (ascending by ID) (0), it changes it to ascending (1).
     * If the current order is ascending (by name) (1), it changes it to descending (2).
     * If the current order is descending (by name) (2), it changes it to default (0).
     * 
     * Finally, it reorders the resources based on the updated order.
     * 
     * @returns {void}
     */
	changeOrder()
	{
		if(this.order === 0)
			this.order = 1;
		else if(this.order === 1)
			this.order = 2;
		else
			this.order = 0;
		this.orderResources();
	}

	/** 
	 * Retrieves all resources from the resource service and populates the resources array with the data.
	 * 
	 *  Displays an error pop-up window if there is an error during data retrieval.
	 * 
	 * @returns {void}
	 */
    ngOnInit(){
      this.resourceService.getAllResources().subscribe({
        next: (data) => {
            for(const element of data)
            {
                this.resources.push(element);
            }
			this.progressSpinnerDisplayed = false;
        },
		error: (err) => { 
			this.error = true;
			let dialogRef = this.dialog.open(PopUpWindowComponent, {data: {
				title: err,
				body: "Kérjük próbálja meg később újratölteni az oldalt.",
				buttonConfirmText: "RENDBEN",
				hasCancel : false,
				buttonCancelText : ""}});
				dialogRef.componentInstance.confirm.subscribe(() => dialogRef.close() )
			}
			
		});
    }

	/**
	 * Opens the resource form for modification with the resource's data the user clicked on.
	 * 
	 * Opens the ResourceFormComponent for the modification of the selected resource.
	 * 
	 * When the user closes the dialog it updates the data in the resources array which is
	 * where the displayed resources are stored then displays a snackbar to inform the
	 * user that the resource has been modified.
	 * 
	 * @param resourceToModify The resource to be modified.
	 * @returns {void}
	 */
    displayFormModify(resourceToModify : Resource) : void
    {
        let dialogRef = this.dialog.open(ResourceFormComponent,{
            width: '80%',
            data: { 
				id: resourceToModify.id,
                name: resourceToModify.name, 
                address: resourceToModify.address,
                size: resourceToModify.size,
                description: resourceToModify.description,
                comment: resourceToModify.comment
            }
        });

		dialogRef.componentInstance.datamodified.subscribe((modifiedResource) =>
		{
			let modifiedResourceIndex = this.resources.indexOf(resourceToModify);
			this.resources[modifiedResourceIndex] = modifiedResource;
			this.orderResources();
			this.snackbarComp.text = resourceToModify.name + " elem módosításra került!";
			this.snackbarComp.displaySnackBar(4);
		});
    }

	/**
	 * Opens the resource form for adding a new resource.
	 * 
	 * When the user closes the dialog it adds the data to the resources array which is
	 * where the displayed resources are stored then displays a snackbar to inform the
	 * user that the resource has been added.
	 * 
	 * @returns {void}
	 */
    displayForm() : void
    {
        let dialogRef = this.dialog.open(ResourceFormComponent,{
            width: '80%',
        });

        dialogRef.componentInstance.dataadded.subscribe((addedResource) => {
            this.resources.push(addedResource);
            this.orderResources();
            this.snackbarComp.text = addedResource.name + " elem hozzáadásra került!"
            this.snackbarComp.displaySnackBar(4);
        }); 
    }

	/**
	 * This function is invoked when the user clicks on the confirmation button of
	 * the delete popup which is triggered by the ResourceListElemComponent of the current resource.
	 * 
	 * Deletes a resource from the list and displays a confirmation message.
	 * 
	 * Removes the specified resource from the resources array.
	 * Sets a confirmation message and the snackbar component displays it.
	 * 
	 * @param resourceToDelete The resource to be deleted.
	 * @returns {void}
	 */
    deleteElement(resourceToDelete : Resource)
    {
        this.resources.splice(this.resources.indexOf(resourceToDelete),1);
        this.snackbarComp.text = resourceToDelete.name+" elem törlésre került!"
        this.snackbarComp.displaySnackBar(4);
    }

	/**
	 * Sorts the resources based on the current order and order type.
	 * 
	 * If the current order is default (0), it sorts the resources by ID in ascending order.
	 * If the current order is ascending (1), it sorts the resources by name in ascending order.
	 * If the current order is descending (2), it sorts the resources by name in descending order.
	 * 
	 * @returns {void}
	 */
   orderResources() {
        
        if(this.order === 0)
        {
			this.resources.sort((a : Resource, b : Resource) =>
			{
				if(a.id < b.id) return -1;
				if(a.id > b.id) return 1;
				return 0;
			});
        }
        else 
        {
			this.resources.sort((a : Resource,b : Resource) => {
				let aSmall = a.name.toLowerCase();
				let bSmall = b.name.toLowerCase();
				if(aSmall < bSmall ) { return this.order === 1 ? -1 : 1;}
				if(aSmall > bSmall) {return this.order === 1 ? 1 : -1;}
				return 0;
			});
        }
    }
}
