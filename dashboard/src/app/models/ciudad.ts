export class Ciudad{
    tab_negocio_ciudad_id: number;
    tab_negocio_ciudad_nombre: string;
  
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}