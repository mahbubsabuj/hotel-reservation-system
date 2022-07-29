import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hotel, HotelsService } from '@client/hotels';
import { DialogData } from '@client/utils';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { take } from 'rxjs';

@Component({
  selector: 'client-hotels-form',
  templateUrl: './hotels-form.component.html',
  styles: []
})
export class HotelsFormComponent implements OnInit {
  @Output() EmitChange = new EventEmitter();
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
    const hotel: Hotel = {
      name: this.hotelsForm.controls['name'].value,
      type: this.hotelsForm.controls['type'].value,
      city: this.hotelsForm.controls['city'].value,
      address: this.hotelsForm.controls['address'].value,
      distance: this.hotelsForm.controls['distance'].value,
      description: this.hotelsForm.controls['description'].value,
      photos: this.hotelsForm.controls['photos'].value,
      cheapestPrice: this.hotelsForm.controls['cheapestPrice'].value,
      isFeatured: this.hotelsForm.controls['isFeatured'].value
    };
    this._addOrUpdateHotel(hotel);
  }
  private _addOrUpdateHotel(hotel: Hotel) {
    this.EmitChange.emit(hotel);
  }
  private _checkEditingMode() {
    if (this.data.id) {
      this.isEditingMode = true;
      this.id = this.data.id;
      this.hotelsService
        .getHotel(this.id)
        .pipe(take(1))
        .subscribe({
          next: (hotel) => {
            this.hotelsForm.controls['name'].setValue(hotel.name);
            this.hotelsForm.controls['type'].setValue(hotel.type);
            this.hotelsForm.controls['city'].setValue(hotel.city);
            this.hotelsForm.controls['address'].setValue(hotel.address);
            this.hotelsForm.controls['distance'].setValue(hotel.distance);
            this.hotelsForm.controls['description'].setValue(hotel.description);
            this.hotelsForm.controls['photos'].setValue(hotel.photos);
            this.hotelsForm.controls['cheapestPrice'].setValue(
              hotel.cheapestPrice
            );
            this.hotelsForm.controls['isFeatured'].setValue(hotel.isFeatured);
          }
        });
    }
  }
}
