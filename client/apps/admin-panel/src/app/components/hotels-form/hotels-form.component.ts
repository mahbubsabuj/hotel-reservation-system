import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotelsService } from '@client/hotels';
import { DialogData } from '@client/utils';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'client-hotels-form',
  templateUrl: './hotels-form.component.html',
  styles: []
})
export class HotelsFormComponent implements OnInit {
  isEditingMode = false;
  id = '';
  hotelTypes = ['One Star', 'Two Star', 'Three Star', 'Four Star', 'Five Star'];
  hotelsForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    distance: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    photos: new FormControl([]),
    cheapestPrice: new FormControl('', Validators.required),
    isFeatured: new FormControl(false)
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private ngxService: NgxUiLoaderService,
    private hotelsService: HotelsService,
    private dialogRef: MatDialogRef<HotelsFormComponent>
  ) {}
  ngOnInit(): void {
    this._checkEditingMode();
  }
  onFormSubmit() {
    //TODO
  }
  private _checkEditingMode() {
    if (this.data.id) {
      this.isEditingMode = true;
      this.id = this.data.id;
    }
  }
  private _getHotels() {
    //TODO
  }
}
