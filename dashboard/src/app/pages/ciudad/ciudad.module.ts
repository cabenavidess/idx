import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CiudadComponent } from './ciudad.component';
import { ButtonCiudadComponent } from './button-ciudad/button-ciudad.component';
import { CiudadFormComponent } from './ciudad-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Ciudad',
      urls: [{ title: 'Ciudad' }, { title: 'Lista' }]
    },
    component: CiudadComponent,
  },
  {
    path: 'actualizar/:id',
    component: CiudadFormComponent,
    data: {
      title: 'Actualizar ciudad',
      urls: [{ title: 'Ciudad' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'crear',
    component: CiudadFormComponent,
    data: {
      title: 'Crear ciudad',
      urls: [{ title: 'Ciudad' }, { title: 'Crear' }]
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
    CiudadComponent,
    ButtonCiudadComponent,
    CiudadFormComponent,
  ],
  entryComponents:[
    ButtonCiudadComponent
  ]
})
export class CiudadModule { }
