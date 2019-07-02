import { ButtonViewComponent } from './../../components/button-view/button-view.component';
import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styles: []
})
export class CategoriaComponent implements OnInit {

  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      tab_categoria_nombre: {
        title: 'Nombre',
      },
      tab_categoria_descripcion: {
        title: 'Descripción'
      },
      tab_categoria_status: {
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
      tab_categoria_id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ButtonViewComponent,
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
    private _categoriaService: CategoriaService,
    private _router: Router,
    private _es: ExcelService
  ) {
    this.getData();

  }

  ngOnInit() {
    this.page = this._router.url;
  }

  getData() {
    this._categoriaService.getAllCategorias()
      .subscribe(result => {
        this.data = result;
      })
  }

  export() {
    this._es.exportAsExcelFile(this.data, 'categoria');
  }
}
