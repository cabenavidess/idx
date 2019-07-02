export class Categoria{
    tab_categoria_id: number;
    tab_categoria_nombre: string;
    tab_categoria_descripcion: string;
    tab_categoria_status: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
