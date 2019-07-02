export class Cliente {
    tab_cliente_id: number;
    tab_cliente_ruc_ci: string;
    tab_cliente_nombre_empresa: string;
    tab_cliente_direccion: string;
    tab_cliente_telefono: string;
    tab_cliente_email: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}