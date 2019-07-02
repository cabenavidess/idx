import { Detalles } from "../../models/detalles";

export class Hero {
    datos_compra_guia:number;
    datos_compra_iva:number;
    datos_compra_subtotal:number;
    fecha = '';
    fk_tab_proveedor_mercaderia_id:number;
    datos_compra_total:number;
    detalles: Detalles[];
  }
  

  // export const heroes: Hero[] = [
  //   {
  //     id: 3,
  //     datos_compra_guia: 'Fact 001 ',
  //     fecha: '14-Feb-2018',
  //     fk_tab_proveedor_mercaderia_id: 666666666,
  //     detalles: [
  //       {
  //         detalle_compra_cantidad: '1',
  //         detalle_compra_valor_unit: '100,00', 
  //         detalle_compra_valor_total: 'CA',  
  //         fk_tap_producto_id: '10,00', 
  //         detalle_compra_valor_venta:'1'
  //       },
  //       {
  //         detalle_compra_cantidad: '1',  
  //         detalle_compra_valor_unit: '100,00', 
  //         detalle_compra_valor_total: 'CA',  
  //         fk_tap_producto_id: '10,00', 
  //         detalle_compra_valor_venta:'1'
  //       },
  //     ]
  //   }
  // ];
  
  export const states = ['CA', 'MD', 'OH', 'VA'];
  
  
  /*
  Copyright 2017 Google Inc. All Rights Reserved.
  Use of this source code is governed by an MIT-style license that
  can be found in the LICENSE file at http://v2.angular.io/license
  */