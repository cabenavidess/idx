import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../services/categoria.service';
import { ComprasService } from '../../../services/compras.service';
import { ButtonCompraComponent } from '../button-compra/button-compra.component';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-compra-lista',
  templateUrl: './compra-lista.component.html',
  styles: []
})
export class CompraListaComponent implements OnInit {

  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      datos_compra_guia: {
        title: 'Nro Guía',
      },
      datos_compra_fecha: {
        title: 'Fecha Ingreso'
      },
      tab_proveedor_mercaderia_nombre: {
        title: 'Proveedor'
      },
      datos_compra_total: {
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
        title: 'Usuario Ingreso',
      },
      kardex_fecha_actualizacion: {
        title: 'Fecha Actualización',
      },
      usuario_modificacion: {
        title: 'Usuario Actualización',
      },
      datos_compra_id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ButtonCompraComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            // let ruta = 'categoria';
          });
        }
      },
    }
  };
  data;

  public page: string = '';
  constructor(
    private _cs: ComprasService,
    private _router: Router,
    private _es: ExcelService
  ) {
    this.getData();

  }

  ngOnInit() {
    this.page = this._router.url;
  }

  getData() {
    this._cs.getCompra()
      .subscribe(result => {
        this.data = result.compras;
      })
  }

  export() {
    this._es.exportAsExcelFile(this.data, 'lista_compras');
  }

}
