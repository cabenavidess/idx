import { Component, ViewChild, ElementRef, AfterViewInit, Input, Output } from '@angular/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  selector: 'app-file-render-stock',
  templateUrl: './file-render-stock.component.html',
  styles: []
})
export class FileRenderStockComponent extends DefaultEditor implements AfterViewInit {
  @ViewChild('fileInput') fileInputVariable: any;
  @ViewChild('name') name: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    //if (this.cell.newValue !== '') {
    //    //   this.name.nativeElement.value = this.getUrlName();
    //}
  }
  updateValue(e: any) {
    debugger;
    this.cell.newValue = this.fileInputVariable.nativeElement.files;
  }
}

