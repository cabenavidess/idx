import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AccessService } from './access.service';
import { HeadersService } from './headers.service';
import { RepresentanteNegocio } from '../models/representante';


@Injectable()
export class RepresentantenegocioService {

  constructor(
    private _globalService: GlobalService,
    private _access: AccessService,
    private _http: HttpClient,
    private _headers: HeadersService
  ) {
    this.getAllRepresentantenegocios();
  }

  getAllRepresentantenegocios() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/representantenegocio', { headers })
      .map((response: any) => {
        return <RepresentanteNegocio[]>response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // POST /v1/Cliente
  addRepresentantenegocio(representantenegocio: RepresentanteNegocio): Observable<any> {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(representantenegocio);
    return this._http.post(
      this._globalService.apiHost + '/representantenegocio', data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // GET /v1/cliente/1
  getRepresentantenegocioById(id: number) {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/representantenegocio/' + id, { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // PUT /v1/cliente/1
  updateRepresentantenegocioById(representantenegocio: RepresentanteNegocio) {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(representantenegocio);
    return this._http.put(
      this._globalService.apiHost + '/representantenegocio/' + representantenegocio.tab_negocio_representante_id, data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }


}
