import { Component, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '@client/utils';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'client-confirmation',
  templateUrl: './confirmation.component.html',
  styles: []
})
export class ConfirmationComponent implements OnInit {
  @Output() EmitStatusChange = new EventEmitter();
  message = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    if (this.data && this.data.message) {
      this.message = this.data.message;
    }
  }
  handleChangeAction() {
    this.EmitStatusChange.emit();
  }
}
