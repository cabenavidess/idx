import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AccessService } from './access.service';
import { HeadersService } from './headers.service';
import { Proveedor } from '../models/proveedor';

@Injectable()
export class ProveedorService {

  constructor(
    private _globalService: GlobalService,
    private _access: AccessService,
    private _http: HttpClient,
    private _headers: HeadersService
  ) {
    this.getAllProveedores();
  }

  getAllProveedores() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/proveedor', { headers })
      .map((response: any) => {
        return <Proveedor[]>response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // POST /v1/Cliente
  addProveedor(cliente: Proveedor): Observable<any> {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(cliente);
    return this._http.post(
      this._globalService.apiHost + '/proveedor', data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // GET /v1/cliente/1
  getProveedorById(id: number) {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/proveedor/' + id, { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // PUT /v1/cliente/1
  updateProveedorById(proveedor: Proveedor) {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(proveedor);
    return this._http.put(
      this._globalService.apiHost + '/proveedor/' + proveedor.tab_proveedor_mercaderia_id, data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }


}
