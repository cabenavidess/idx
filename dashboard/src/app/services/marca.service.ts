import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AccessService } from './access.service';
import { HeadersService } from './headers.service';
import { Marca } from './../models/marca';

@Injectable()
export class MarcaService {
  mydata;
  constructor(
    private _globalService: GlobalService,
    private _access: AccessService,
    private _http: HttpClient,
    private _headers: HeadersService
  ) {
    this.mydata = JSON.parse(localStorage.getItem('user-data'));
    this.getAllMarcasEstado();
    this.getAllMarcas();
  }

  getAllMarcas() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/marca', { headers })
      .map((response: any) => {
        return <Marca[]>response.data;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }



  getAllMarcasEstado() {
    let url = `${this._globalService.apiHost}/marca/estado/${this.mydata.token}/${this.mydata.id}`;
    return this._http.get(url)
      .map((response: any) => {
        return <Marca[]>response.data;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }


  // POST /v1/Cliente
  addMarca(marca: Marca): Observable<any> {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(marca);
    return this._http.post(
      this._globalService.apiHost + '/marca', data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // GET /v1/cliente/1
  getMarcaById(id: number) {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/marca/' + id, { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // PUT /v1/cliente/1
  updateMarcaById(marca: Marca) {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(marca);
    return this._http.put(
      this._globalService.apiHost + '/marca/' + marca.tab_marca_id, data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }

}
