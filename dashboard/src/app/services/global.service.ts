import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class GlobalService {

  public apiHost: string;
  public setting: any = {};
  public urlGlobalService: string;

  constructor() {
    // Cambiar ruta en producccion
    // https://servicios.induxionecuador.com/web/v1
    this.urlGlobalService = 'http://servicios.induxion.local/v1';

    if (environment.production == true) {
      this.apiHost = this.urlGlobalService;
      //this.apiHost = 'https://servicios.induxionecuador.com/web/v1';
    } else {
      this.apiHost = this.urlGlobalService;
      //  this.apiHost ='https://servicios.induxionecuador.com/web/v1';
    }
  }

  loadGlobalSettingsFromLocalStorage(): void {
    if (localStorage.getItem('dashboard-setting') != null) {
      this.setting = JSON.parse(localStorage.getItem('dashboard-setting'));
    }
  }

}
