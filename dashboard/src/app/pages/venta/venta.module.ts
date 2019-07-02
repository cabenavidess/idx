import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UiSwitchModule } from 'ngx-ui-switch';
import { SelectModule } from 'ng2-select-compat';
import { VentaComponent } from './venta.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MoviButtonComponent } from '../stock/movi-button/movi-button.component';
import { VentaDetalleComponent } from './venta-detalle/venta-detalle.component';
import { VentaListaComponent } from './venta-lista/venta-lista.component';
import { ButtonVentaComponent } from './button-venta/button-venta.component';
import { RecaudacionesComponent } from './recaudaciones/recaudaciones.component';
import { RecaudacionesDiarioComponent } from './recaudaciones-diario/recaudaciones-diario.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Ventas',
      urls: [{ title: 'Ventas' }, { title: 'Proceso de Ventas' }]
    },
    component: VentaComponent,
  },
  {
    path: 'actualizar/:id',
    component: VentaComponent,
    data: {
      title: 'Actualizar Venta',
      urls: [{ title: 'Ventas' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'crear',
    component: VentaComponent,
    data: {
      title: 'Crear venta',
      urls: [{ title: 'Ventas' }, { title: 'Crear' }]
    }
  },
  {
    path: 'detalles/:id',
    component: VentaDetalleComponent,
    data: {
      title: 'Venta detalle',
      urls: [{ title: 'Ventas' }, { title: 'Detalles' }]
    }
  },
  {
    path: 'lista',
    component: VentaListaComponent,
    data: {
      title: 'Venta Lista',
      urls: [{ title: 'Ventas' }, { title: 'Lista' }]
    }
  },
  {
    path: 'recaudaciones',
    component: RecaudacionesComponent,
    data: {
      title: 'Total Recaudaciones',
      urls: [{ title: 'Recaudaciones' }, { title: 'Total Recaudado' }]
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
    SelectModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    VentaComponent,
    VentaDetalleComponent,
    VentaListaComponent,
    ButtonVentaComponent,
    RecaudacionesComponent,
    RecaudacionesDiarioComponent
  ],
  entryComponents: [
    ButtonVentaComponent
  ]
})
export class VentaModule { }
