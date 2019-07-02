import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImpuestoService } from '../../services/impuesto.service';
import { ImpuestoButtonComponent } from './impuesto-button/impuesto-button.component';

@Component({
  selector: 'app-impuesto',
  templateUrl: './impuesto.component.html',
  styles: []
})
export class ImpuestoComponent implements OnInit {


  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      tab_impuestos_iva_nombre: {
        title: 'Nombre',
      },
      tab_impuestos_iva_descripcion: {
        title: 'Descripción',
      },
      tab_impuestos_iva_valor: {
        title: 'Valor',
      },
      tab_impuestos_iva_id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ImpuestoButtonComponent,
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
    private _is: ImpuestoService,
    private _router: Router
  ) {
    this.getData();
  }

  ngOnInit() {
    this.page = this._router.url;
  }

  getData() {
    this._is.getAllImpuesto()
      .subscribe(result => {
        this.data = result;
      })
  }

}
