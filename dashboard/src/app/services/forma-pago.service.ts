import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AccessService } from './access.service';
import { HeadersService } from './headers.service';


@Injectable()
export class FormaPagoService {
  mydata;
  constructor(
    private _globalService: GlobalService,
    private _access: AccessService,
    private _http: HttpClient,
    private _headers: HeadersService
  ) {
    this.mydata = JSON.parse(localStorage.getItem('user-data'));
    this.getFormaPago();
  }
  getFormaPago() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/formapago', { headers })
      .map((response: any) => {
        return <any[]>response.data;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }
}
