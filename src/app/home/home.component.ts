import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  length: any;
  pageIndex: any = 0;
  pageSize: any = 10;
  pageSizeOption: any = [5, 10, 25, 100];
  data: any;
  loaddata: boolean = true;
  head: any = '';
  isAsc: boolean = true;
  searchText:any;
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {

  }
  displayedColumns: string[] = ['Date', 'Price', 'Open', 'High', 'ChangePercentFromLastMonth', 'Volume'];
  dataSource: any[] = [];
  loadUsers() {
    this.loaddata = false;
    console.log("api call");
    this.http.get('https://api.sampleapis.com/bitcoin/historical_prices').subscribe(res => {
      console.log(res);
      this.data = res;
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
}
