import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PartyService } from 'src/app/services/party.service';

@Component({
  selector: 'app-create-party',
  templateUrl: './create-party.component.html',
  styleUrls: ['./create-party.component.css'],
})
export class CreatePartyComponent implements OnInit {
  createForm: FormGroup;
  partyData: any;
  isView:boolean= false
  constructor(
    private fb: FormBuilder,
    private partyService: PartyService,
    private dialogRef: MatDialogRef<CreatePartyComponent>,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  
    this.partyData = data;
    if(this.partyData != null && this.partyData.isView == true) {
      this.isView = data.isView
      this.partyData = this.partyData.data
    }
  }

  ngOnInit(): void {    
    this.createForm = this.fb.group({
      company_name: this.data == null ? [''] : this.partyData.company_name,
      name: this.data == null ?  [''] : this.partyData.name,
      mobile_no:
        this.data == null
          ? [
              '',
              Validators.compose([
                Validators.minLength(10),
                Validators.maxLength(10),
                Validators.pattern('[0-9]*'),
              ]),
            ]
          : this.partyData.mobile_no,
      telephone_no:
        this.data == null ? [''] : this.partyData.telephone_no,
      whatsapp_no:
        this.data == null ? [''] : this.partyData.whatsapp_no,
      email:
        this.data == null
          ? [
              '',
              Validators.pattern(
                '^([a-zA-Z0-9][.-]?)+@([a-zA-Z0-9]+[.-]?)*[a-zA-Z0-9][.][a-zA-Z]{2,3}$'
              ),
            ]
          : this.partyData.email,
      remark: this.data == null ? [''] : this.partyData.remark,
      login_access: this.data == null ? [''] : this.partyData.login_access,
      date_of_birth:
        this.data == null
          ? ['']
          : new Date(this.partyData.date_of_birth),
      anniversary_date:
        this.data == null
          ? ['']
          : new Date(this.partyData.anniversary_date),
      gstin: this.data == null ? [''] : this.partyData.gstin,
      pan_no:
        this.data == null
          ? [
              '',
              Validators.compose([
                Validators.minLength(10),
                Validators.maxLength(10),
              ]),
            ]
          : this.partyData.pan_no,
      apply_tds: this.data == null ? [''] : this.partyData.apply_tds,
      credit_limit: this.data == null ? [''] : this.partyData.credit_limit,
      address: this.data == null ? [''] : this.partyData.address,
      bank: this.data == null ? [''] : this.partyData.bank,
    });

    if(this.isView == true) {
      this.createForm.disable();
    }
  }

  getErrorMessage(controlName: string, alias: string) {
    const control = this.createForm.controls[controlName];

    if (control.errors) {
      if (control.errors['required']) {
        return alias + ' is required';
      }
      if (control.errors['minlength']) {
        return (
          alias +
          ' should have at least ' +
          control.errors['minlength'].requiredLength +
          ' characters'
        );
      }
      if (control.errors['pattern']) {
        return 'Please enter valid ' + alias.toLowerCase();
      }
      if (control.errors['maxlength']) {
        return (
          alias +
          ' should not have more than ' +
          control.errors['maxlength'].requiredLength +
          ' characters'
        );
      }
      if (control.errors['min']) {
        return alias + ' should be greater than ' + control.errors['min'].min;
      }
      if (control.errors['max']) {
        return alias + ' can not be greater than ' + control.errors['max'].max;
      }
    }
    return;
  }
  cancel() {
    this.dialogRef.close(false);
  }
  createParty() {
    let formValue = this.createForm.value;
    formValue.date_of_birth =
      formValue.date_of_birth != ''
        ? this.datePipe.transform(formValue.date_of_birth, 'yyyy-MM-dd')
        : '';
    formValue.anniversary_date =
      formValue.anniversary_date != ''
        ? this.datePipe.transform(formValue.anniversary_date, 'yyyy-MM-dd')
        : '';
    if (this.data != null) {
      this.partyService.updateParty(this.partyData.id, formValue).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.success == false) {
            this._snackBar.open(response.msg, '', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            
          } else {
            this._snackBar.open(response.msg, '', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.dialogRef.close(true);
          }
        },
        error: (err: any) => {
          console.log('error', err);
          this._snackBar.open('Something went wrong! Kindly recheck', '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        complete: () => {},
      });
    } else {
      this.partyService.createParty(formValue).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.success == true) {
            this._snackBar.open(response.msg, '', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.dialogRef.close(true);
          }
        },
        error: (err: any) => {
          console.log('error', err);
          this._snackBar.open('Something went wrong! Kindly recheck', '', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        complete: () => {},
      });
    }
  }
}
