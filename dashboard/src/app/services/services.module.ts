import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from './global.service';
import { AccessService } from './access.service';
import { ClienteService } from './cliente.service';
import { HeadersService } from './headers.service';
import { ExcelService } from './excel.service';
import { CiudadService } from './ciudad.service';
import { CategoriaService } from './categoria.service';
import { AlertService } from './alert.service';
import { SucursalService } from './sucursal.service';
import { ProveedorService } from './proveedor.service';
import { ProductoService } from './producto.service';
import { RepresentantenegocioService } from './representantenegocio.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    GlobalService,
    AccessService,
    ClienteService,
    HeadersService,
    ExcelService,
    CiudadService,
    CategoriaService,
    AlertService,
    SucursalService,
    ProveedorService,
    ProductoService,
    RepresentantenegocioService
  ]
})
export class ServicesModule { }
