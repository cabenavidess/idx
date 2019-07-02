import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorComponent } from './proveedor.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonProveedorComponent } from './button-proveedor/button-proveedor.component';
import { ProveedorFormComponent } from './proveedor-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Proveedor',
      urls: [{ title: 'Proveedor' }, { title: 'Lista' }]
    },
    component: ProveedorComponent,
  },
  {
    path: 'actualizar/:id',
    component: ProveedorFormComponent,
    data: {
      title: 'Actualizar proveedor',
      urls: [{ title: 'Proveedor' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'crear',
    component: ProveedorFormComponent,
    data: {
      title: 'Crear proveedor',
      urls: [{ title: 'Proveedor' }, { title: 'Crear' }]
    }
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule
  ],
  declarations: [
    ProveedorComponent,
    ButtonProveedorComponent,
    ProveedorFormComponent
  ],
  entryComponents: [
    ButtonProveedorComponent
  ]
})
export class ProveedorModule { }
