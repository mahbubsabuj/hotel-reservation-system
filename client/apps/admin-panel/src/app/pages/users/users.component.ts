import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User, UsersService } from '@client/users';
import { DialogData } from '@client/utils';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';

@Component({
  selector: 'client-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  columns: string[] = ['userName', 'email', 'isAdmin', 'actions'];
  users: User[] = [];
  dataSource: MatTableDataSource<User> | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  constructor(
    private usersService: UsersService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._getUsers();
  }
  private _getUsers() {
    this.ngxService.start();
    this.usersService
      .getUsers()
      .pipe(take(1))
      .subscribe({
        next: (users) => {
          this.ngxService.stop();
          this.users = users;
          console.log(this.users);
          this.dataSource = new MatTableDataSource(users);
          if (this.paginator && this.sort) {
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        error: () => {
          this.ngxService.stop();
        }
      });
  }

  changeUserStatus(id: string, isChecked: boolean) {
    this.ngxService.start();
    const user: User = {
      isAdmin: isChecked
    };
    this.usersService
      .updateUser(user, id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          //TODO
          this.ngxService.stop();
        },
        error: () => {
          //TODO
          this.ngxService.stop();
        }
      });
  }
  deleteUser(id: string) {
    const dialogData: DialogData = { message: 'delete this user' };
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: dialogData
    });
    dialogRef.componentInstance.EmitStatusChange.subscribe(() => {
      dialogRef.close();
      this.ngxService.start();
      this.usersService
        .deleteUser(id)
        .pipe(take(1))
        .subscribe({
          next: () => {
            //TODO
            this.ngxService.stop();
            this._getUsers();
          },
          error: () => {
            //TODO
            this.ngxService.stop();
          }
        });
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
