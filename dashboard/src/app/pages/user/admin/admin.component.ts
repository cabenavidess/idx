import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { AdminButtonComponent } from '../admin-button/admin-button.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {
  settings = {
    actions: false,
    attr: {
      class: 'table table-bordered table-hover',
    },
    columns: {
      username: {
        title: 'Nombre',
      },
      email: {
        title: 'Email'
      },
      status_label: {
        title: 'Estado',
        type: "html",
        filter: {
          type: 'list',
          config: {
            selectText: 'Seleccionar...',
            list: [
              { value: 'Active', title: 'Activo' },
              { value: 'Disabled', title: 'Bloqueado' },
            ],
          },
        },
        valuePrepareFunction: (row) => {
          if (row == 'Active') {
            return `<span  class="good mdi mdi-clipboard-check">Activo</span>`;
          } else if (row == 'Disabled') {
            return `<span class="damage mdi mdi-bookmark-remove">Bloqueado</span>`;
          }
          return '';
        }
      },
      updated_at: {
        class: 'text-success',
        type: 'html',
        title: 'Último Acceso',
      },
      last_login_ip: {
        type: 'html',
        title: 'Última Ip de Acceso',
      },
      role_label: {
        title: 'Rol',
        type: "html",
        filter: true,
        valuePrepareFunction: (row) => {
          if (row == 'Administrator') {
            return `<span class="good">${row}</span>`;
          } else if (row == 'Staff') {
            return `<span class="azul">Vendedor</span>`;
          }
          return '';
        }
      },
      id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: AdminButtonComponent,
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
    private _us: UserService,
    private _router: Router
  ) {
    this.getData();
  }

  ngOnInit() {
    this.page = this._router.url;
  }

  getData() {
    this._us.getAllUsersAdmin()
      .subscribe(result => {
        this.data = result;
      })
  }
}
