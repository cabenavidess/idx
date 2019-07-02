export interface ItemProd {
  tab_producto_id?: number;
  tab_producto_codigo: string;
  tab_producto_nombre: string;
  precio: number;
  entradas?: string;
  salidas?: string;
  stock?: number;
  imagen?: string;
  iva?: string;
  descripcion?: string;
  marca?: string;
  cant?: number;
  quantity?: number;
  utility?: number;
  descuento?: number;
  valor_venta?: number;
  valor_venta_total?: number;
}