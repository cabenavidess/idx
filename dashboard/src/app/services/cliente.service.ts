import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './../models/cliente.model';
import { GlobalService } from './global.service';
import { AccessService } from './access.service';
import { HeadersService } from './headers.service';

@Injectable()
export class ClienteService {

  constructor(
    private _globalService: GlobalService,
    private _access: AccessService,
    private _http: HttpClient,
    private _headers: HeadersService
  ) { }

  getAllClientes() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/cliente', { headers })
      .map((response: any) => {
        return <Cliente[]>response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // POST /v1/Cliente
  addCliente(cliente: Cliente): Observable<any> {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(cliente);
    return this._http.post(
      this._globalService.apiHost + '/cliente', data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // GET /v1/cliente/1
  getClienteById(id: number) {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/cliente/' + id, { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // PUT /v1/cliente/1
  updateClienteById(cliente: Cliente) {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(cliente);
    return this._http.put(
      this._globalService.apiHost + '/cliente/' + cliente.tab_cliente_id, data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
        throw '## Error ##' + JSON.stringify(error);
      })
  }


}
