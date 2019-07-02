import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ImpuestoComponent } from './impuesto.component';
import { ImpuestoFormComponent } from './impuesto-form.component';
import { ImpuestoButtonComponent } from './impuesto-button/impuesto-button.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Impuesto',
      urls: [{ title: 'Impuesto' }, { title: 'Lista' }]
    },
    component: ImpuestoComponent,
  },
  {
    path: 'actualizar/:id',
    component: ImpuestoFormComponent,
    data: {
      title: 'Actualizar Impuesto',
      urls: [{ title: 'Impuesto' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'crear',
    component: ImpuestoFormComponent,
    data: {
      title: 'Crear Impuesto',
      urls: [{ title: 'Impuesto' }, { title: 'Crear' }]
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
    ImpuestoComponent,
    ImpuestoFormComponent,
    ImpuestoButtonComponent
  ],
  entryComponents:[
    ImpuestoButtonComponent
  ]
})
export class ImpuestoModule { }
