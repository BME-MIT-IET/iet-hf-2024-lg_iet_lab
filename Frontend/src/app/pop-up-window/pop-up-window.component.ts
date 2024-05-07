import { CommonModule } from '@angular/common';
import { Component,EventEmitter,Inject,Input,Output, booleanAttribute, numberAttribute } from '@angular/core';
import { PopupType } from '../enums/pouptype';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface PopupData{
    title: string,
    body: string,
    buttonConfirmText: string,
    hasCancel : boolean,
    buttonCancelText : string,
}

@Component({
  selector: 'app-pop-up-window',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './pop-up-window.component.html',
  styleUrl: './pop-up-window.component.scss'
})
export class PopUpWindowComponent {
    
    constructor(@Inject(MAT_DIALOG_DATA) public data: PopupData){
    }

    title = this.data.title;
    body = this.data.body;
    btnConfirmText = this.data.buttonConfirmText;
    hasCancel = this.data.hasCancel;
    btnCancelText = this.hasCancel ? this.data.buttonCancelText : "";

    /**
    * Triggers the confirm event when the confirm button was pressed.
    * 
    * @returns {void}
    */
    buttonConfirmClicked()
    {
        this.confirm.emit(this);
    }

    /**
    * Triggers the cancel event when the cancel button was pressed.
    * 
    * @returns {void}
    */
    buttonCancelClicked()
    {
        this.cancel.emit(this);
    }

    @Output() cancel = new EventEmitter<any>();
    @Output() confirm = new EventEmitter<any>();

}
