import { StockComponent } from './stock.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileRenderStockComponent } from './file-render-stock/file-render-stock.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { MoviButtonComponent } from './movi-button/movi-button.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Stock',
      urls: [{ title: 'Stock' }, { title: 'Lista' }]
    },
    component: StockComponent,
  },
  {
    path: 'actualizar/:id',
    component: StockComponent,
    data: {
      title: 'Actualizar cliente',
      urls: [{ title: 'Cliente' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'crear',
    component: StockComponent,
    data: {
      title: 'Crear cliente',
      urls: [{ title: 'Cliente' }, { title: 'Crear' }]
    }
  },
  {
    path: 'movimientos',
    component: MovimientosComponent,
    data: {
      title: 'Movimientos',
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
    StockComponent,
    FileRenderStockComponent,
    MovimientosComponent,
    MoviButtonComponent
  ],
  exports: [
    StockComponent,
    MoviButtonComponent
  ],
  entryComponents: [
    MoviButtonComponent
  ]
})
export class StockModule { }
