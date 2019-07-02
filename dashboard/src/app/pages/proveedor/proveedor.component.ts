import { ButtonProveedorComponent } from './button-proveedor/button-proveedor.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { ExcelService } from '../../services/excel.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styles: []
})
export class ProveedorComponent implements OnInit {

  pagedItems;
  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      tab_proveedor_mercaderia_ruc: {
        title: 'Ruc Proveedor',
      },
      tab_proveedor_mercaderia_nombre: {
        title: 'Nombre Dueño'
      },
      tab_proveedor_mercaderia_empresa: {
        title: 'Empresa'
      },

      tab_proveedor_mercaderia_responsable: {
        title: 'Responsable'
      },


      tab_proveedor_mercaderia_telefono: {
        title: 'Teléfono'
      },


      tab_proveedor_mercaderia_direccion: {
        title: 'Dirección'
      },

      tab_proveedor_mercaderia_email: {
        title: 'Email'
      },
      tab_proveedor_mercaderia_id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ButtonProveedorComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            let ruta = 'proveedor';
          });
        }
      },
    }
  };

  data;

  constructor(
    private _router: Router,
    private _ms: ProveedorService,
    private _es: ExcelService
  ) { }

  ngOnInit() {
    this.getData();
  }


  getData() {
    this._ms.getAllProveedores()
      .subscribe(result => {
        this.data = result;
        
      })
  }

  export() {
    this._es.exportAsExcelFile(this.data, 'proveedores');
  }
}
