import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AccessService } from './access.service';
import { HeadersService } from './headers.service';
import { Impuesto } from '../models/impuesto';

@Injectable()
export class ImpuestoService {

  constructor(
    private _globalService: GlobalService,
    private _access: AccessService,
    private _http: HttpClient,
    private _headers: HeadersService
  ) {
    this.getAllImpuesto();
   }

  getAllImpuesto(){
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/impuesto', { headers })
      .map((response: any) => {
        return <Impuesto[]>response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

   // POST /v1/Cliente
   addImpuesto(impuesto: Impuesto): Observable<any> {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(impuesto);
    return this._http.post(
      this._globalService.apiHost + '/impuesto', data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // GET /v1/cliente/1
  getImpuestoById(id: number) {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/impuesto/' + id, { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // PUT /v1/cliente/1
  updateImpuestoById(impuesto: Impuesto) {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(impuesto);
    return this._http.put(
      this._globalService.apiHost + '/impuesto/' + impuesto.tab_impuestos_iva_id, data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

}
