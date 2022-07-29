import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Hotel, HotelsService } from '@client/hotels';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HotelsFormComponent } from '../../components/hotels-form/hotels-form.component';

@Component({
  selector: 'client-hotels',
  templateUrl: './hotels.component.html',
  styles: []
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[] = [];
  columns: string[] = ['name', 'type', 'city', 'isFeatured', 'actions'];
  dataSource: MatTableDataSource<Hotel> | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private hotelsService: HotelsService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._getHotels();
  }
  addHotel() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.data = { id: null };
    const dialogRef = this.dialog.open(HotelsFormComponent, dialogConfig);
  }
  updateStatus(id: string, checked: boolean) {
    console.log(id, checked);
    //TODO
  }
  deleteHotel(id: string) {
    console.log(id);
    //TODO
  }
  updateHotel(id: string) {
    console.log(id);
    //TODO
  }
  private _getHotels() {
    //TODO
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }
}
