export class Marca{
    tab_marca_id: number;
    tab_marca_nombre: string;
    tab_marca_descripcion: string;
    tab_marca_status: string;
    fk_tab_categoria_id:number;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}