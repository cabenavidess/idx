import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from './global.service';
import { AccessService } from './access.service';
import { HeadersService } from './headers.service';
import { HttpClient } from '@angular/common/http';
import { Sucursal } from '../models/sucursal';

@Injectable()
export class SucursalService {

  constructor(
    private _globalService: GlobalService,
    private _access: AccessService,
    private _http: HttpClient,
    private _headers: HeadersService
  ) {
    this.getSucursal();
  }


  getSucursal() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/sucursal/getsucursal', { headers })
      .map((response: any) => {
        return <any[]>response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }


  // POST /v1/Cliente
  addCategoria(sucursal: Sucursal): Observable<any> {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(sucursal);
    return this._http.post(
      this._globalService.apiHost + '/sucursal', data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // GET /v1/cliente/1
  getCategoriaById(id: number) {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/sucursal/' + id, { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // PUT /v1/cliente/1
  updateCategoriaById(sucursal: Sucursal) {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(sucursal);
    return this._http.put(
      this._globalService.apiHost + '/sucursal/' + sucursal.tab_negocio_sucursal_id, data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

}
