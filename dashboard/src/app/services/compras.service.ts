import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { HeadersService } from './headers.service';

@Injectable()
export class ComprasService {

  constructor(
    private _http: HttpClient,
    private _globalService: GlobalService,
    private _headers: HeadersService
  ) { }

  getCategoriaById(id) {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/compra/facturaid/' + id, { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  getCompra() {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/compra/guardafactura', { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

}
