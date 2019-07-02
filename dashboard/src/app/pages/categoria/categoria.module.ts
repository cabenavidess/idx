import { CategoriaFormComponent } from './categoria-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CategoriaComponent } from './categoria.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Categoría',
      urls: [{ title: 'Categoría' }, { title: 'Lista' }]
    },
    component: CategoriaComponent,
  },
  {
    path: 'actualizar/:id',
    component: CategoriaFormComponent,
    data: {
      title: 'Actualizar Categoría',
      urls: [{ title: 'Categoría' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'crear',
    component: CategoriaFormComponent,
    data: {
      title: 'Crear Categoría',
      urls: [{ title: 'Categoría' }, { title: 'Crear' }]
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
    CategoriaComponent,
    CategoriaFormComponent
  ]
})
export class CategoriaModule { }
