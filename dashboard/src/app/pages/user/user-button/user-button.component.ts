import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-button',
  templateUrl: './user-button.component.html',
  styles: []
})
export class UserButtonComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Input() ruta: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private _router: Router) {
  }
  ngOnInit() {
    // this.renderValue = this.value.toString();
  }

  onClick() {
    this.renderValue = this.value.toString();
     

    this._router.navigate(['/user/actualizar/', this.renderValue]);
  }
}