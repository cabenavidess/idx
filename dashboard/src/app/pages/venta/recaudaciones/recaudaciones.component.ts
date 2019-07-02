import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonVentaComponent } from '../button-venta/button-venta.component';
import { Router } from '../../../../../node_modules/@angular/router';
import { ComprasService } from '../../../services/compras.service';
import { VentasService } from '../../../services/ventas.service';
import { ExcelService } from '../../../services/excel.service';


@Component({
  selector: 'app-recaudaciones',
  templateUrl: './recaudaciones.component.html',
  styles: []
})
export class RecaudacionesComponent implements OnInit {

  @ViewChild('grid')
  table;

  ngAfterViewInit(): void {
    this.table.grid.source.onChangedSource.subscribe(() => {
      // update other component with the SUM
      result => {

      }
    });
  }

  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      fecha: {
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
    private _es: ExcelService,
  ) {
    this.getData();


  }

  ngOnInit() {
    // this.page = this._router.url;
  }

  getData() {
    this._vs.getRecaudaciones()
      .subscribe((result: any) => {
        this.data = result.ventas;
        // console.log(this.data);
      })
  }


  export() {
    this._es.exportAsExcelFile(this.data, 'reacudado_diario');
  }


}

