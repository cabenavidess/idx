import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AccessService } from './access.service';
import { HeadersService } from './headers.service';

@Injectable()
export class StockService {

  constructor(
    private _globalService: GlobalService,
    private _access: AccessService,
    private _http: HttpClient,
    private _headers: HeadersService
  ) {
    this.getAllStock();
    this.getAllMovimientos();
    this.getAllStockExport();
  }

  //todos los productos sin paginar
  getAllStock() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/stock/all', { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  getAllStockExport() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/stock/stock_exportadmin', { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  getAllMovimientos() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/movimientos/movimientos', { headers })
      .map((response: any) => {
        return response.data.movimientos;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

}
