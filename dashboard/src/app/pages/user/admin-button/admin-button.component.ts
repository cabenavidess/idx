import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-button',
  templateUrl: './admin-button.component.html',
  styles: []
})
export class AdminButtonComponent implements ViewCell, OnInit {
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
     

    this._router.navigate(['/user/admin/actualizar/', this.renderValue]);
  }
}