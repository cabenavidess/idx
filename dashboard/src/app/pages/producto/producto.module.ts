import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from './producto.component';
import { ProductoButtonComponent } from './producto-button/producto-button.component';
import { ProductoFormComponent } from './producto-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileRenderComponent } from './file-render/file-render.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Producto',
      urls: [{ title: 'Producto' }, { title: 'Lista' }]
    },
    component: ProductoComponent,
  },
  {
    path: 'actualizar/:id',
    component: ProductoFormComponent,
    data: {
      title: 'Actualizar Producto',
      urls: [{ title: 'Producto' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'crear',
    component: ProductoFormComponent,
    data: {
      title: 'Crear Producto',
      urls: [{ title: 'Producto' }, { title: 'Crear' }]
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
    ProductoComponent, 
    ProductoButtonComponent, 
    ProductoFormComponent, FileRenderComponent
  ],
  entryComponents:[
    ProductoButtonComponent,
    FileRenderComponent
  ]
})
export class ProductoModule { }
