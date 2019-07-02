export class Proveedor{
    tab_proveedor_mercaderia_id: number;
    tab_proveedor_mercaderia_ruc: string;
    tab_proveedor_mercaderia_nombre: string;
    tab_proveedor_mercaderia_empresa: string;
    tab_proveedor_mercaderia_responsable: string;
    tab_proveedor_mercaderia_telefono: string;
    tab_proveedor_mercaderia_direccion: string;
    tab_proveedor_mercaderia_email: string;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}