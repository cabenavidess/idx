export class Producto{
    tab_producto_id: number;
    tab_producto_codigo: string;
    tab_producto_nombre: string;
    tab_producto_descripcion: string;
    tab_producto_imagen: string;
    tab_producto_status: string;
    fk_tab_marca_id:number;
    tab_producto_iva:number;
    iva: string;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}