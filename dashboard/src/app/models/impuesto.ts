export class Impuesto{
    tab_impuestos_iva_id: number ;
    tab_impuestos_iva_nombre: string;
    tab_impuestos_iva_descripcion: string;
    tab_impuestos_iva_valor: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}