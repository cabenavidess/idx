export interface Item {
  producto_id?: number;
  codigo: string;
  nombre: string;
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
  descuento?: number;
}