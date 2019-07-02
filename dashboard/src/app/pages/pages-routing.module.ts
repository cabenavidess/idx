import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './pages.component';

const routes: Routes = [
    {
        path: '', component: PageComponent,
        children: [
            { path: 'dashboard', loadChildren: './starter/starter.module#StarterModule' },
            { path: 'cliente', loadChildren: './cliente/cliente.module#ClienteModule' },
            { path: 'categoria', loadChildren: './categoria/categoria.module#CategoriaModule' },
            { path: 'marca', loadChildren: './marca/marca.module#MarcaModule' },
            { path: 'compras', loadChildren: './compras/compras.module#ComprasModule' },
            { path: 'stock', loadChildren: './stock/stock.module#StockModule' },
            { path: 'user', loadChildren: './user/user.module#UserModule' },
            { path: 'ciudad', loadChildren: './ciudad/ciudad.module#CiudadModule' },
            { path: 'impuesto', loadChildren: './impuesto/impuesto.module#ImpuestoModule' },
            { path: 'producto', loadChildren: './producto/producto.module#ProductoModule' },
            { path: 'proveedor', loadChildren: './proveedor/proveedor.module#ProveedorModule' },
            { path: 'representantenegocio', loadChildren: './representantenegocio/representantenegocio.module#RepresentantenegocioModule' },
            { path: 'ventas', loadChildren : './venta/venta.module#VentaModule'}, 
            { path: 'sucursal', loadChildren: './sucursal/sucursal.module#SucursalModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
