import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonSucursalComponent } from './button-sucursal/button-sucursal.component';
import { SucursalService } from '../../services/sucursal.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styles: []
})
export class SucursalComponent implements OnInit {

  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      tab_negocio_representante_nombre: {
        title: 'Representante',
      },
      tab_negocio_ciudad_nombre:{
        title: 'Ciudad',
      },
      tab_negocio_sucursal_direccion: {
        title: 'Dirección',
      },
      tab_negocio_sucursal_email: {
        title: 'Email',
      },
      tab_negocio_sucursal_nombre: {
        title: 'Nombre',
      },
      tab_negocio_sucursal_telefono: {
        title: 'Teléfono',
      },
      tab_negocio_sucursal_id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ButtonSucursalComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          });
        }
      },
    }
  };

  data;

  constructor(
    private _ss: SucursalService,
    private _router: Router
  ) {
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this._ss.getSucursal()
      .subscribe(result => {
        this.data = result;
      })
  }
}
