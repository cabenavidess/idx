import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UserButtonComponent } from './user-button/user-button.component';
import { UserFormComponent } from './user-form.component';
import { AdminComponent } from './admin/admin.component';
import { AdminButtonComponent } from './admin-button/admin-button.component';
import { AdminFormComponent } from './admin-form/admin-form.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Usuarios',
      urls: [{ title: 'Usuarios' }, { title: 'Lista' }]
    },
    component: UserComponent,
  },
  {
    path: 'actualizar/:id',
    component: UserFormComponent,
    data: {
      title: 'Actualizar usuario',
      urls: [{ title: 'Usuario' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'crear',
    component: UserFormComponent,
    data: {
      title: 'Crear Usuario',
      urls: [{ title: 'Usuario' }, { title: 'Crear' }]
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: {
      title: 'Usuarios',
      urls: [{ title: 'Usuarios' }, { title: 'Lista' }]
    }
  },
  {
    path: 'admin/actualizar/:id',
    component: AdminFormComponent,
    data: {
      title: 'Actualizar Usuario',
      urls: [{ title: 'Usuario' }, { title: 'Actualizar' }]
    }
  },
  {
    path: 'admin/crear',
    component: AdminFormComponent,
    data: {
      title: 'Crear Usuario',
      urls: [{ title: 'Administrador' }, { title: 'Crear' }]
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
    UserComponent,
    UserButtonComponent,
    UserFormComponent,
    AdminComponent,
    AdminButtonComponent,
    AdminFormComponent
  ],
  entryComponents: [
    UserButtonComponent,
    AdminButtonComponent
  ]
})
export class UserModule { }
