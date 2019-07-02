import { Vdetalles } from "./vdetalles";

export class Venta {
    fk_sucursal_id: number;
    fk_tab_cliente_id: number;
    venta_datos_nro_factura: number;
    venta_datos_fecha: string;
    fk_forma_pago_id: number;
    venta_datos_subtotal: number;
    venta_datos_subtotal_cero: number;
    venta_datos_iva: number;
    venta_datos_total: number;
    detalles: Vdetalles[];
}