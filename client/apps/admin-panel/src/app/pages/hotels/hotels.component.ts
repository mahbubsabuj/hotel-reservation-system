import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Hotel, HotelsService } from '@client/hotels';
import { DialogData } from '@client/utils';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { HotelsFormComponent } from '../../components/hotels-form/hotels-form.component';

@Component({
  selector: 'client-hotels',
  templateUrl: './hotels.component.html',
  styles: []
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[] = [];
  columns: string[] = ['name', 'type', 'city', 'actions'];
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
    dialogRef.componentInstance.EmitChange.pipe(take(1)).subscribe(
      (hotel: Hotel) => {
        this.ngxService.start();
        dialogRef.close();
        this.hotelsService
          .addHotel(hotel)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this._getHotels();
              this.ngxService.stop();
            },
            error: () => {
              this.ngxService.stop();
            }
          });
      }
    );
  }
  deleteHotel(id: string) {
    const dialogData: DialogData = { message: 'delete this hotel' };
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: dialogData
    });
    dialogRef.componentInstance.EmitStatusChange.subscribe(() => {
      this.ngxService.start();
      this.hotelsService.deleteHotel(id).pipe(take(1)).subscribe({
        next: () => {
          this.ngxService.stop();
          this._getHotels();
          dialogRef.close();
          console.log("YES")
        },
        error: () => {
          this.ngxService.stop();
          dialogRef.close();
        }
      })
    });
  }
  updateHotel(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.data = { id: id };
    const dialogRef = this.dialog.open(HotelsFormComponent, dialogConfig);
    dialogRef.componentInstance.EmitChange.pipe(take(1)).subscribe(
      (hotel: Hotel) => {
        this.ngxService.start();
        dialogRef.close();
        this.hotelsService
          .updateHotel(id, hotel)
          .pipe(take(1))
          .subscribe({
            next: () => {
              this.ngxService.stop();
            },
            error: () => {
              this.ngxService.stop();
            }
          });
      }
    );
  }
  private _getHotels() {
    this.ngxService.start();
    this.hotelsService
      .getHotels()
      .pipe(take(1))
      .subscribe({
        next: (hotels) => {
          this.ngxService.stop();
          this.hotels = hotels;
          console.log(this.hotels);
          this.dataSource = new MatTableDataSource(this.hotels);
          if (this.paginator && this.sort) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        error: (error) => {
          this.ngxService.stop();
          console.log(error);
        }
      });
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
