import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SucursalComponent } from './sucursal.component';
import { SucursalFormComponent } from './sucursal-form/sucursal-form.component';
import { ButtonSucursalComponent } from './button-sucursal/button-sucursal.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Sucursal',
      urls: [{ title: 'Sucursal' }, { title: 'Lista' }]
    },
    component: SucursalComponent,
  },
  {
    path: 'actualizar/:id',
    component: SucursalFormComponent,
    data: {
      title: 'Actualizar Sucursal',
      urls: [{ title: 'Sucursal' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'crear',
    component: SucursalFormComponent,
    data: {
      title: 'Crear Sucursal',
      urls: [{ title: 'Sucursal' }, { title: 'Crear' }]
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
    SucursalComponent,
    SucursalFormComponent,
    ButtonSucursalComponent
  ],
  entryComponents: [
    ButtonSucursalComponent
  ]
})
export class SucursalModule { }
