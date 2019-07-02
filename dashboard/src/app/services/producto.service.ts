import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AccessService } from './access.service';
import { HeadersService } from './headers.service';
import { Proveedor } from '../models/proveedor';
import { Producto } from '../models/producto';

@Injectable()
export class ProductoService {

  mydata;
  constructor(
    private _globalService: GlobalService,
    private _access: AccessService,
    private _http: HttpClient,
    private _headers: HeadersService
  ) {
    this.mydata = JSON.parse(localStorage.getItem('user-data'));
    this.getAllProductos();
  }

  getAllProductos() {
    let headers = this._headers.getHeaders();
    let url = `${this._globalService.apiHost}/producto/productos/${this.mydata.token}/${this.mydata.id}`;
    return this._http.get(url)
      .map((response: any) => {
        return <Producto[]>response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  getAllProductosPrecio() {
    let url = `${this._globalService.apiHost}/producto/productosprecio/${this.mydata.token}/${this.mydata.id}`;
    return this._http.get(url)
      .map((response: any) => {
        return <Producto[]>response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  getAllProductos2() {
    let url = `${this._globalService.apiHost}/producto/productos/${this.mydata.token}/${this.mydata.id}`;
    return this._http.get(url)
      .map((response: any) => {
        return <Producto[]>response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  getAllProductosSelect() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/producto/getproductoselect')
      .map((response: any) => {
        return <Producto2[]>response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // POST /v1/Cliente
  addProducto(cliente: Producto): Observable<any> {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(cliente);
    return this._http.post(
      this._globalService.apiHost + '/producto', data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // GET /v1/cliente/1
  getProductoById(id: number) {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/producto/' + id, { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // PUT /v1/cliente/1
  updateProductoById(producto: Producto) {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(producto);
    return this._http.put(
      this._globalService.apiHost + '/producto/' + producto.tab_producto_id, data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

}


export class Producto2 {
  id: number;
  name: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}