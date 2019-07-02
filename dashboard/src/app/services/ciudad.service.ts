import { Ciudad } from './../models/ciudad';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AccessService } from './access.service';
import { HeadersService } from './headers.service';

@Injectable()
export class CiudadService {

  constructor(
    private _globalService: GlobalService,
    private _access: AccessService,
    private _http: HttpClient,
    private _headers: HeadersService
  ) {
    this.getAllCiudad();
   }

  getAllCiudad() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/ciudad', { headers })
      .map((response: any) => {
        return <Ciudad[]>response.data;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

   // POST /v1/Cliente
   addCiudad(ciudad: Ciudad): Observable<any> {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(ciudad);
    return this._http.post(
      this._globalService.apiHost + '/ciudad', data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // GET /v1/cliente/1
  getCiudadById(id: number) {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/ciudad/' + id, { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // PUT /v1/cliente/1
  updateCiudadById(ciudad: Ciudad) {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(ciudad);
    return this._http.put(
      this._globalService.apiHost + '/ciudad/' + ciudad.tab_negocio_ciudad_id, data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

}
