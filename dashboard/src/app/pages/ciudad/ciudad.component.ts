import { CiudadService } from './../../services/ciudad.service';
import { ButtonCiudadComponent } from './button-ciudad/button-ciudad.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styles: []
})
export class CiudadComponent implements OnInit {

  
  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      tab_negocio_ciudad_nombre: {
        title: 'Nombre',
      },
      tab_negocio_ciudad_id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ButtonCiudadComponent,
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
    private _cs: CiudadService,
    private _router: Router
  ) {
    this.getData();
  }

  ngOnInit() {
    this.page = this._router.url;
  }

  getData() {
    this._cs.getAllCiudad()
      .subscribe(result => {
        this.data = result;
      })
  }

}
