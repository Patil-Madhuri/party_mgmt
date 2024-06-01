import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CreatePartyComponent } from '../create-party/create-party.component';
import { MatDialog } from '@angular/material/dialog';
import { PartyService } from 'src/app/services/party.service';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: ['./party-list.component.css'],
})
export class PartyListComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'company_name',
    'mobile_no',
    'email',
    'action',
  ];
  dataSource = new MatTableDataSource();
  partyListCount = 0;
  constructor(private dialog: MatDialog, private partyService: PartyService) {}
  ngOnInit(): void {
    this.getPartyList();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addNewParty() {
    const dialogRef = this.dialog.open(CreatePartyComponent, {
      width: '80%',
      height: '80%',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getPartyList();
      }
    });
  }
  getPartyList() {
    this.partyService.getAllParty().subscribe({
      next: (response: any) => {
        console.log(response);
        this.partyListCount = response.length;
        this.dataSource.data = response;
      },
      error: (err: any) => {
        console.log('error', err);
      },
      complete: () => {},
    });
  }

  deleteParty(object: any) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {});

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      if (result == 'y') {
        this.partyService.deleteParty(object.id).subscribe({
          next: (response: any) => {
            console.log(response);
            this.getPartyList();
          },
          error: (err: any) => {
            console.log('error', err);
          },
          complete: () => {},
        });
      }
    });
  }
  updateParty(object: any) {
    const dialogRef = this.dialog.open(CreatePartyComponent, {
      width: '80%',
      height: '80%',
      data:object
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getPartyList();
      }
    });
  }
  viewParty(object:any){
    const dialogRef = this.dialog.open(CreatePartyComponent, {
      width: '80%',
      height: '80%',
      data:{
        data:object,
        isView:true
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.getPartyList();
      }
    });
  }
}
