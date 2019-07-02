import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { HeadersService } from './headers.service';
import { AccessService } from './access.service';

@Injectable()
export class VentasService {

  mydata;

  constructor(
    private _http: HttpClient,
    private _globalService: GlobalService,
    private _headers: HeadersService,
    private _as: AccessService
  ) {
    this.mydata = JSON.parse(localStorage.getItem('user-data'));
    this.getRecaudaciones();
    this.getRecaudacionesDiarias();
  }

  getVentaById(id) {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/venta/facturaid/' + id, { headers })
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
      this._globalService.apiHost + '/venta/guardafactura', { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }

  getRecaudaciones() {
    let url = `${this._globalService.apiHost}/ventasd/totaldiariog/${this.mydata.token}/${this.mydata.id}`;
    return this._http.get(url)
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }

  getRecaudacionesDiarias() {
    let url = `${this._globalService.apiHost}/ventasd/totaldiario/${this.mydata.token}/${this.mydata.id}`;
    return this._http.get(url)
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }

  getRecaudacionesCountDiarias() {
    return this._http.get(
      this._globalService.apiHost + '/ventasd/countdiario')
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }

  getComprasCountDiarias() {
    return this._http.get(
      this._globalService.apiHost + '/ventasd/countdiarioc')
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }


  getCount() {
    return this._http.get(
      this._globalService.apiHost + '/venta/countfactura')
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }


  getLista() {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/venta/lista', { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }


}
