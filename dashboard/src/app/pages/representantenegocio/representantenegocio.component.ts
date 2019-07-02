import { RepresentantenegocioService } from './../../services/representantenegocio.service';
import { ButtonRepresentantenegocioComponent } from './button-representantenegocio/button-representantenegocio.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-representantenegocio',
  templateUrl: './representantenegocio.component.html',
  styles: []
})
export class RepresentantenegocioComponent implements OnInit {

  pagedItems;
  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      tab_negocio_representante_ruc_ci: {
        title: 'Cedula',
      },
      tab_negocio_representante_nombre: {
        title: 'Nombre'
      },
        tab_negocio_representante_id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ButtonRepresentantenegocioComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            let ruta = 'representantenegocio';
          });
        }
      },
    }
  };

  data;

  constructor(
    private _router: Router,
    private _ms: RepresentantenegocioService
  ) { }

  ngOnInit() {
    this.getData();
  }


  getData() {
    this._ms.getAllRepresentantenegocios()
      .subscribe(result => {
        this.data = result;
        
      })
  }
}
