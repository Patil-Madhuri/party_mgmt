import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmationComponent>){

  }
  confirmation(value:string){
    this.dialogRef.close(value)
  }
}
