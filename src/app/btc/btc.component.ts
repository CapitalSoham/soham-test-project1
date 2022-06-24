import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  name: string;
}
@Component({
  selector: 'app-btc',
  templateUrl: './btc.component.html',
  styleUrls: ['./btc.component.css']
})
export class BtcComponent implements OnInit {
  length: any;
  pageIndex: any = 0;
  pageSize: any = 10;
  pageSizeOption: any = [5, 10, 25, 100];
  data: any[]=[];
  loaddata: boolean = true;
  head: any = '';
  isAsc: boolean = true;
  searchText:any;
  constructor(private http: HttpClient,public dialog: MatDialog) {
  }

  ngOnInit(): void {

  }
  displayedColumns: string[] = ['Currency', '15 minutes delayed market price', 'Last price', 'Buy', 'Sell'];
  dataSource: any[] = [];
  loadData() {
    this.data = [];
    this.dataSource = [];
    this.loaddata = false;
    console.log("api call");
    this.http.get('https://blockchain.info/ticker').subscribe((res:any) => {
      console.log(res);
      for (const key in res) {
        this.data.push(res[key])
      }
      this.dataSource = this.data.slice(0, this.pageSize * 1)
      this.length = this.data.length;
    });
    console.log(this.dataSource);

  }
  getServerData(e: any) {
    console.log(e);
    if (e.previousPageIndex > e.pageIndex) {
      e.previousPageIndex = e.previousPageIndex - 2;
    }
    if (this.pageSize != e.pageSize) {
      this.dataSource = this.data.slice(e.pageIndex * e.pageSize, e.pageIndex * e.pageSize + 1 + e.pageSize)
      this.pageSize = e.pageSize;
    } else {
      if (e.pageIndex == 0) {
        this.dataSource = this.data.slice(0, e.pageSize * 1)
      } else {
        e.previousPageIndex++;
        e.pageIndex++;
        this.dataSource = this.data.slice(e.pageSize * e.previousPageIndex, e.pageSize * e.pageIndex)
      }
    }
  }
  sortData(e: any) {
    console.log(e);
    this.head = e;
    this.dataSource = this.data.sort((a: { Date: string | number; Price: string | number; Open: string | number; High: string | number; ChangePercentFromLastMonth: string | number; Volume: string | number; }, b: { Date: string | number; Price: string | number; Open: string | number; High: string | number; ChangePercentFromLastMonth: string | number; Volume: string | number; }) => {
      this.isAsc = !this.isAsc;
      switch (e) {
        case 'Date':
          return this.compare(a.Date, b.Date, this.isAsc);
        case 'Price':
          return this.compare(a.Price, b.Price, this.isAsc);
        case 'Open':
          return this.compare(a.Open, b.Open, this.isAsc);
        case 'High':
          return this.compare(a.High, b.High, this.isAsc);
        case 'ChangePercentFromLastMonth':
          return this.compare(a.ChangePercentFromLastMonth, b.ChangePercentFromLastMonth, this.isAsc);
        case 'Volume':
          return this.compare(a.Volume, b.Volume, this.isAsc);
        default:
          return 0;
      }
    });
    console.log(this.dataSource);
    
  }
  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  openDialog(e:any,enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: e},
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  searchValue:any = '';
  value:any = '';
  isconvert:boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private http: HttpClient
  ) {}
  onCheckClick(): void {
    this.isconvert = false;
    console.log(this.searchValue);
    this.http.get(`https://blockchain.info/tobtc?currency=${this.data.name}&value=${this.searchValue}`).subscribe((res:any) => {
      console.log(res);
      this.value = res;
      this.isconvert = true;
    });
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }
}
