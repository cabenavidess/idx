import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { ClienteFormComponent } from './cliente-form.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ClienteButtonComponent } from './cliente-button/cliente-button.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cliente',
      urls: [{ title: 'Cliente' }, { title: 'Lista' }]
    },
    component: ClienteComponent,
  },
  {
    path: 'actualizar/:id',
    component: ClienteFormComponent,
    data: {
      title: 'Actualizar cliente',
      urls: [{ title: 'Cliente' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'crear',
    component: ClienteFormComponent,
    data: {
      title: 'Crear cliente',
      urls: [{ title: 'Cliente' }, { title: 'Crear' }]
    }
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule
  ],
  declarations: [
    ClienteComponent,
    ClienteFormComponent,
    ClienteButtonComponent
  ],
  entryComponents: [
    ClienteButtonComponent
  ],
})
export class ClienteModule { }
