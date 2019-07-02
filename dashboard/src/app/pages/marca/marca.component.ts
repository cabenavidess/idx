import { ButtonMarcaComponent } from './button-marca/button-marca.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarcaService } from '../../services/marca.service';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styles: []
})
export class MarcaComponent implements OnInit {

  act = 'activo';
  inc = 'inactivo';

  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      tab_marca_nombre: {
        title: 'Marca',
      },
      tab_marca_descripcion: {
        title: 'Descripción'
      },
      tab_marca_status: {
        title: 'Estado',
        filter: {
          type: 'list',
          config: {
            selectText: 'Seleccionar...',
            list: [
              { value: 1, title: 'Activo' },
              { value: 0, title: 'Inactivo' },
            ],
          },
        },
        type: "html",
        valuePrepareFunction: (cell) => {
          if (cell == 1) {
            return `<span class="good mdi mdi-clipboard-check"  > Activo</span>`;
          } else if (cell == 0) {
            return `<span class="warning mdi mdi-bookmark-remove"  > Inactivo</span>`;
          }
          return '';
        }
      },
      tab_marca_id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ButtonMarcaComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            let ruta = 'categoria';
          });
        }
      },
    }
  };

  data;

  constructor(
    private _router: Router,
    private _ms: MarcaService,
    private _es: ExcelService
  ) { }

  ngOnInit() {
    this.getData();
  }


  getData() {
    this._ms.getAllMarcas()
      .subscribe(result => {
        this.data = result;

      })
  }

  export() {
    this._es.exportAsExcelFile(this.data, 'marca');
  }
}
