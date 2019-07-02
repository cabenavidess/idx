import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasComponent } from './compras.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompraDetalleComponent } from './compra-detalle/compra-detalle.component';
import { CompraListaComponent } from './compra-lista/compra-lista.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ButtonCompraComponent } from './button-compra/button-compra.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Compras',
      urls: [{ title: 'Compras' }, { title: 'Proceso de adquisición de productos'}]
    },
    component: ComprasComponent,
  },
  {
    path: 'actualizar/:id',
    component: ComprasComponent,
    data: {
      title: 'Actualizar cliente',
      urls: [{ title: 'Compras' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'crear',
    component: ComprasComponent,
    data: {
      title: 'Crear compra',
      urls: [{ title: 'Compras' }, { title: 'Crear' }]
    }
  },
  {
    path: 'detalles/:id',
    component: CompraDetalleComponent,
    data: {
      title: 'Compra detalle',
      urls: [{ title: 'Compras' }, { title: 'Detalles' }]
    }
  },
  {
    path: 'lista',
    component: CompraListaComponent,
    data: {
      title: 'Compra Lista',
      urls: [{ title: 'Compras' }, { title: 'Lista' }]
    }
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule,
    UiSwitchModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    ComprasComponent,
    CompraDetalleComponent,
    CompraListaComponent,
    ButtonCompraComponent,
  ],
  entryComponents: [
    ButtonCompraComponent
  ],
  exports: [
  ]
})
export class ComprasModule { }
