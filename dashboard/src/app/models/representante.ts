export class RepresentanteNegocio{
    tab_negocio_representante_id: number;
    tab_negocio_representante_ruc_ci: string;
    tab_negocio_representante_nombre: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}