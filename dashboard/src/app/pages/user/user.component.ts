import { ButtonViewComponent } from './../../components/button-view/button-view.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserButtonComponent } from './user-button/user-button.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
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
        filter: {
          type: 'list',
          config: {
            selectText: 'Seleccionar...',
            list: [
              { value: 'Active', title: 'Activo' },
              { value: 'Disabled', title: 'Inactivo' },
            ],
          },
        },
      },
      updated_at: {
        class: 'text-success',
        type: 'html',
        title: 'Último Acceso',
      },
      role_label: {
        title: 'Rol',
        type: "html",
        filter: true,
        valuePrepareFunction: (row) => {
          if (row == 'User') {
            return `<span class="good"  >Vendedor</span>`;
          }
          return '';
        }
      },

      id: {
        title: 'Acciones',
        type: 'custom',
        renderComponent: UserButtonComponent,
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
    this._us.getAllUsers()
      .subscribe(result => {
        this.data = result;
      })
  }
}
