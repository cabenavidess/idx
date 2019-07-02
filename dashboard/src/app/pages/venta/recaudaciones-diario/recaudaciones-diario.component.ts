import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
import { ComprasService } from '../../../services/compras.service';
import { VentasService } from '../../../services/ventas.service';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-recaudaciones-diario',
  templateUrl: './recaudaciones-diario.component.html',
  styles: []
})
export class RecaudacionesDiarioComponent implements OnInit {


  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      mes: {
        title: 'Fecha',
      },
      efectivo: {
        title: 'Efectivo',
      },
      tarjetas: {
        title: 'Tarjetas',
      },
      dinero_elec: {
        title: 'Dinero Electrónico',
      },
      otros: {
        title: 'Otros',
      },
      total: {
        title: 'Total',
        type: "html",
        filter: true,
        valuePrepareFunction: (value) => {
          return value === 'Total' ? value : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
        }
      },
    }
  };
  data;

  public page: string = '';
  constructor(
    private _cs: ComprasService,
    private _vs: VentasService,
    private _router: Router,
    private _es: ExcelService
  ) {
    this.getData();

  }

  ngOnInit() {
    // this.page = this._router.url;
  }

  getData() {
    this._vs.getRecaudacionesDiarias()
      .subscribe((result: any) => {
        this.data = result.ventas;
      })
  }

  export() {
    this._es.exportAsExcelFile(this.data, 'recaudado');
  }
}

