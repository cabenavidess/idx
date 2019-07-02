import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from '../../../services/stock.service';
import { MoviButtonComponent } from '../movi-button/movi-button.component';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styles: []
})
export class MovimientosComponent implements OnInit {

  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      kardex_nro_fact: {
        title: 'Nro'
      },
      fecha: {
        title: 'Fecha Ingreso',
      },
      codigo: {
        title: 'Código',
      },
      tab_producto_nombre: {
        title: 'Nombre'
      },
      tab_producto_descripcion: {
        title: 'Descripción',
      },
      kardex_cantidad: {
        title: 'Cantidad'
      },
      kardex_movimiento: {
        title: 'Movimiento',
        type: "html",
        filter: {
          type: 'list',
          config: {
            selectText: 'Seleccionar...',
            list: [
              { value: 'ENTRADA', title: 'Entrada' },
              { value: 'SALIDA', title: 'Salida' },
              // { value: 'DEVOLUCION', title: 'Anulación' },
              // { value: 'RESERVA', title: 'Reserva' },
            ],
          },
        },
        valuePrepareFunction: (row) => {
          if (row == 'ENTRADA') {
            return `<span class="good"  >${row}</span>`;
          } else if (row == 'SALIDA') {
            return `<span class="warning"  >${row}</span>`;
          } else if (row == null || row == 'DEVOLUCION') {
            return `<span class="damage"  >ANULACION</span>`;
          } else if (row == 'RESERVA') {
            return `<span class="warning"  >${row}</span>`;
          }
          return '';
        }
      },
      tab_producto_imagen: {
        title: 'Imagen',
        type: 'html',
        filter: true,
        valuePrepareFunction: (imagen: string) => { return `<img width="50px" src="${imagen}" />`; },
      },
      estado: {
        title: 'Estado',
        type: "html",
        filter: {
          type: 'list',
          config: {
            selectText: 'Seleccionar...',
            list: [
              { value: 'Saliida Compra', title: 'Salida Venta' },
              { value: 'Anulacion venta', title: 'Anulacion Venta' },
              // { value: 'Reserva sin confirmar', title: 'Reserva sin confirmar' },
              { value: 'Entrada Compra', title: 'Entrada Compra' },
              { value: 'Anulacion compra', title: 'Anulacion Compra' },
            ],
          },
        },
        valuePrepareFunction: (row) => {
          if (row == 'Entrada Compra') {
            return `<span class="good"  >${row}</span>`;
          } else if (row == 'Anulacion compra') {
            return `<span class="damage"  >Anulación Compra</span>`;
          } else if (row == 'Salida Compra') {
            return `<span class="good"  >Salida Venta</span>`;
          } else if (row == 'Anulacion venta') {
            return `<span class="damage"  >Anulación Venta</span>`;
          }
          return '';
        }
      },
      username: {
        title: 'Usuario Ingreso'
      },
      kardex_fecha_actualizacion:{
        title: 'Fecha Actualización'
      },
      usuario_modificacion:{
        title: 'Usuario Actualización'
      },
      // kardex_nro_fact: {
      //   title: 'Acciones',
      //   type: 'custom',
      //   renderComponent: MoviButtonComponent,
      //   onComponentInitFunction(instance) {
      //     instance.save.subscribe(row => {
      //     });
      //   }
      // },
    },
  };



  data;
  public page: string = '';
  constructor(
    private _ss: StockService,
    private _router: Router,
    private _es: ExcelService
  ) {
    this.getData();

  }

  ngOnInit() {
  }

  getData() {
    this._ss.getAllMovimientos()
      .subscribe(result => {
        this.data = result;
      })
  }

  export() {
    this._es.exportAsExcelFile(this.data, 'movimientos');
  }


}
