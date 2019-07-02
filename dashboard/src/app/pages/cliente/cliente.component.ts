import { ClienteButtonComponent } from './cliente-button/cliente-button.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExcelService } from './../../services/excel.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from './../../models/cliente.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {

  pagedItems;
  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      tab_cliente_ruc_ci: {
        title: 'Cédula',
      },
      tab_cliente_nombre_empresa: {
        title: 'Nombre'
      },
      tab_cliente_direccion: {
        title: 'Direción'
      },
      tab_cliente_email: {
        title: 'Email',
      },
      tab_cliente_telefono: {
        title: 'Teléfono'
      },
      tab_cliente_id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: ClienteButtonComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
          });
        }
      },
    }
  };

  data;


  constructor(
    private _clienteService: ClienteService,
    private _excelService: ExcelService,
    private _router: Router,
    private _es: ExcelService
  ) {
    this.getAllClients();
  }

  ngOnInit() {

  }

  //   iente_id: 3, tab_cliente_ruc_ci: "1004134977001",…}
  // tab_cliente_direccion
  // :
  // "FERNANDO DAQUILEMA 1-74"
  // tab_cliente_email
  // :
  // "andres@mail.com"
  // tab_cliente_id
  // :
  // "1004134977001"
  // tab_cliente_telefono

  getAllClients() {
    this._clienteService.getAllClientes()
      .subscribe(result => {
        this.data = result;
      });
  }

  saveExcel() {
    this._excelService.exportAsExcelFile(this.pagedItems, 'Clientes')
  }

  public viewCliente(cliente: Cliente): void {
    this._router.navigate(['/cliente/actualizar', cliente.tab_cliente_id]);
  }

  export() {
    this._es.exportAsExcelFile(this.data, 'clientes');
  }
}


