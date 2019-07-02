import { Injectable } from '@angular/core';
import { AccessService } from './access.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeadersService {

  constructor(
    private _access: AccessService
  ) { }

  public getHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this._access.getToken()
    });
    return headers;
  }

  // class HttpHeaders {
  //   constructor(headers?: string | {...})
  //   has(name: string): boolean
  //   get(name: string): string | null
  //   keys(): string[]
  //   getAll(name: string): string[] | null
  //   append(name: string, value: string | string[]): HttpHeaders
  //   set(name: string, value: string | string[]): HttpHeaders
  //   delete(name: string, value?: string | string[]): HttpHeaders
  // }

}
