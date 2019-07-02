import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepresentantenegocioComponent } from './representantenegocio.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonRepresentantenegocioComponent } from './button-representantenegocio/button-representantenegocio.component';
import { RepresentantenegocioFormComponent } from './representantenegocio-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Representante',
      urls: [{ title: 'Representante' }, { title: 'Lista' }]
    },
    component: RepresentantenegocioComponent,
  },
  {
    path: 'actualizar/:id',
    component: RepresentantenegocioFormComponent,
    data: {
      title: 'Actualizar representante',
      urls: [{ title: 'Representante' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'crear',
    component: RepresentantenegocioFormComponent,
    data: {
      title: 'Crear representante',
      urls: [{ title: 'Representante' }, { title: 'Crear' }]
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
    RepresentantenegocioComponent,
    ButtonRepresentantenegocioComponent,
    RepresentantenegocioFormComponent
  ],
  entryComponents: [
    ButtonRepresentantenegocioComponent
  ]
})
export class RepresentantenegocioModule { }
