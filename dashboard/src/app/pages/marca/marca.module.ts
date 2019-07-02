import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcaComponent } from './marca.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonMarcaComponent } from './button-marca/button-marca.component';
import { MarcaFormComponent } from './marca-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Marca',
      urls: [{ title: 'Marca' }, { title: 'Lista' }]
    },
    component: MarcaComponent,
  },
  {
    path: 'actualizar/:id',
    component: MarcaFormComponent,
    data: {
      title: 'Actualizar marca',
      urls: [{ title: 'Marca' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'crear',
    component: MarcaFormComponent,
    data: {
      title: 'Crear marca',
      urls: [{ title: 'Marca' }, { title: 'Crear' }]
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
    MarcaComponent,
    ButtonMarcaComponent,
    MarcaFormComponent
  ],
  entryComponents: [
    ButtonMarcaComponent
  ]
})
export class MarcaModule { }
