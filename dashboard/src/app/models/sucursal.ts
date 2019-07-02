export class Sucursal{
    tab_negocio_sucursal_id: number;
    tab_negocio_sucursal_nombre: string;
    tab_negocio_sucursal_direccion: string;
    tab_negocio_sucursal_telefono: string;
    tab_negocio_sucursal_email: string;
    fk_tab_negocio_representante_id:number;
    fk_tab_negocio_ciudad_id:number;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}