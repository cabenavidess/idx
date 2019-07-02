import { Component, OnInit } from '@angular/core';
import { ButtonVentaComponent } from '../button-venta/button-venta.component';
import { Router } from '../../../../../node_modules/@angular/router';
import { ComprasService } from '../../../services/compras.service';
import { VentasService } from '../../../services/ventas.service';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-venta-lista',
  templateUrl: './venta-lista.component.html',
  styles: []
})
export class VentaListaComponent implements OnInit {

  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      nro: {
        title: 'Nro Factura',
      },
      fecha: {
        title: 'Fecha Ingreso'
      },
      cedula: {
        title: 'Cédula'
      },
      nombre: {
        title: 'Cliente'
      },
      tipo: {
        title: 'Tipo',
        filter: {
          type: 'list',
          config: {
            selectText: 'Seleccionar...',
            list: [
              { value: 'Efectivo', title: 'Efectivo' },
              { value: 'Tarjetas', title: 'Tarjetas' },
              { value: 'Dinero Electronico', title: 'Dinero Electronico' },
              { value: 'Otros', title: 'Otros' },
            ],
          },
        },
      },
      total: {
        title: 'Total',
        type: "html",
        filter: true,
        valuePrepareFunction: (value) => {
          return value === 'Total' ? value : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
        }
      },
      estado: {
        title: 'Estado',
        type: "html",
        filter: {
          type: 'list',
          config: {
            selectText: 'Seleccionar...',
            list: [
              { value: 'ANULADA', title: 'Anulada' },
              { value: 'REGISTRADA', title: 'Registrada' },
            ],
          },
        },
        valuePrepareFunction: (value) => {
          if (value == "ANULADA") {
            return `<span class="damage"  >${value}</span>`;
          } else if (value == "REGISTRADA") {
            return `<span class="azul"  >${value}</span>`;
          }
          return '';
        }
      },
      username: {
        title: 'Usuario Ingreso'
      },
      kardex_fecha_actualizacion: {
        title: 'Fecha Actualización',
      },
      usuario_modificacion: {
        title: 'Usuario Actualización',
      },
      id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ButtonVentaComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          });
        }
      },
    }
  };
  data;

  public page: string = '';
  constructor(
    private _vs: VentasService,
    private _router: Router,
    private _es: ExcelService
  ) {
    this.getData();

  }

  ngOnInit() {
    this.page = this._router.url;
  }

  getData() {
    this._vs.getLista()
      .subscribe(result => {
        this.data = result.compras;
      })
  }

  export() {
    this._es.exportAsExcelFile(this.data, 'lista_venta');
  }

}
