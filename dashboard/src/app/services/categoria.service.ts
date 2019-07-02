import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AccessService } from './access.service';
import { HeadersService } from './headers.service';
import { Categoria } from './../models/categoria';

@Injectable()
export class CategoriaService {

  constructor(
    private _globalService: GlobalService,
    private _access: AccessService,
    private _http: HttpClient,
    private _headers: HeadersService
  ) {
    this.getAllCategorias();
  }

  getAllCategorias() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/categoria', { headers })
      .map((response: any) => {
        return <Categoria[]>response.data;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  getAllCategoriasActive() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/categoria/estado', { headers })
      .map((response: any) => {
        return <Categoria[]>response.data;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // POST /v1/Cliente
  addCategoria(cliente: Categoria): Observable<any> {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(cliente);
    return this._http.post(
      this._globalService.apiHost + '/categoria', data, { headers })
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
      this._globalService.apiHost + '/categoria/' + id, { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // PUT /v1/cliente/1
  updateCategoriaById(categoria: Categoria) {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(categoria);
    return this._http.put(
      this._globalService.apiHost + '/categoria/' + categoria.tab_categoria_id, data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

}
