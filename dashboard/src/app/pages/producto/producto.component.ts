import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoButtonComponent } from './producto-button/producto-button.component';
import { ProductoService } from '../../services/producto.service';
import { FileRenderComponent } from './file-render/file-render.component';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  pagedItems;
  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      tab_producto_codigo: {
        title: 'Código',
      },
      tab_producto_nombre: {
        title: 'Nombre'
      },
      tab_producto_descripcion: {
        title: 'Descripción'
      },
      tab_marca_nombre: {
        title: 'Marca',
      },
      tab_categoria_nombre:{
        title: 'Catgoría',
      },
      tab_producto_status: {
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
      iva: {
        title: 'IVA',
        filter: {
          type: 'list',
          config: {
            selectText: 'Seleccionar...',
            list: [
              { value: 'CON IVA', title: 'SI' },
              { value: 'SIN IVA', title: 'NO' },
            ],
          },
        },
        type: "html",
        valuePrepareFunction: (cell) => {
          if (cell == 'CON IVA') {
            return `<span> SI</span>`;
          } else if (cell == 'SIN IVA') {
            return `<span> NO</span>`;
          }
          return '';
        }
      },

      tab_producto_imagen: {
        title: 'Imagen',
        type: 'html',
        valuePrepareFunction: (tab_producto_imagen: string) => { return `<img width="50px" src="${tab_producto_imagen}" />`; },
      },
      tab_producto_id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ProductoButtonComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          });
        }
      },
    }
  };

  data;


  constructor(
    private _ps: ProductoService,
    private _router: Router,
    private _es: ExcelService,
  ) {
    this.getAllClients();
  }

  ngOnInit() {

  }

  getAllClients() {
    this._ps.getAllProductos2()
      .subscribe(result => {
        this.data = result;
        console.log('PRODUCTOS',this.data);
        
      });
  }

  export() {
    this._es.exportAsExcelFile(this.data, 'catalogo_productos');
  }


}
