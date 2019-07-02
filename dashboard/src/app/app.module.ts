import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs)

import { ServicesModule } from './services/services.module';
import { ButtonViewComponent } from './components/button-view/button-view.component';
import { HeroService } from './pages/compras/hero.service';
import { ComprasService } from './services/compras.service';
import { MarcaService } from './services/marca.service';
import { StockModule } from './pages/stock/stock.module';
import { StockService } from './services/stock.service';
import { UserService } from './services/user.service';
import { ImpuestoService } from './services/impuesto.service';
import { ProveedorService } from './services/proveedor.service';
import { RepresentantenegocioService } from './services/representantenegocio.service';
import { FormaPagoService } from './services/forma-pago.service';
import { PosService } from './services/pos.service';
import { VentasService } from './services/ventas.service';
import { PosService1 } from './services/pos.service1';


@NgModule({
  declarations: [
    AppComponent,
    ButtonViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    ServicesModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    StockModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-US' },
    AuthGuard,
    HeroService,
    ComprasService,
    MarcaService,
    StockService,
    UserService,
    ImpuestoService,
    ProveedorService,
    RepresentantenegocioService,
    FormaPagoService,
    PosService,
    VentasService,
    PosService1
  ],
  entryComponents: [
    ButtonViewComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function getToken() {
  return localStorage.getItem('dashboard-token');
}
