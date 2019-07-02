import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../services/stock.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ExcelService } from '../../services/excel.service';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styles: []
})

export class StockComponent implements OnInit {


  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      codigo: {
        title: 'Código',
      },
      nombre: {
        title: 'Nombre'
      },
      descripcion: {
        title: 'Descripción',
      },
      marca: {
        title: 'Marca',
      },
      categoria:{
        title: 'Categoría',
      },
      iva: {
        title: 'IVA',
        filter: {
          type: 'list',
          config: {
            selectText: 'Seleccionar...',
            list: [
              { value: 'SI', title: 'Si' },
              { value: 'NO', title: 'No' },
            ],
          },
        },
      },
      precio: {
        title: 'Precio de Venta',
        type: "html",
        filter: true,
        valuePrepareFunction: (value) => {
          return value === 'Total' ? value : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
        }
      },
      stock: {
        title: 'Stock',
        type: "html",
        filter: true,
        valuePrepareFunction: (stock) => {
          if (stock <= 5) {
            return `<span class="damage bold"  >${stock}</span>`;
          } else if (stock >= 6 && stock <= 10) {
            return `<span class="azul bold"  >${stock}</span>`;
          } else if (stock >= 11) {
            return `<span class="good bold"  >${stock}</span>`;
          }
          return '';
        }
      },
      imagen: {
        title: 'Imagen',
        type: 'html',
        filter: true,
        valuePrepareFunction: (imagen: string) => { return `<img width="50px" src="${imagen}" />`; },
      },
    },
  };



  data;
  data_export;
  stock;

  public page: string = '';
  constructor(
    private _ss: StockService,
    private _router: Router,
    private _es: ExcelService
  ) {
    this.getData();
    this.getDataExport();
  }

  ngOnInit() {
  }

  getData() {
    this._ss.getAllStock()
      .subscribe(result => {
        this.data = result;
      })
  }

  getDataExport() {
    this._ss.getAllStockExport()
      .subscribe(result => {
        this.data_export = result;
      })
  }

  export() {
    this._es.exportAsExcelFile(this.data_export, 'stock');
  }

}
