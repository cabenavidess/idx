import { Injectable } from '@angular/core';
import { Headers, Response } from '@angular/http';
import { GlobalService } from './global.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router } from "@angular/router";
// import { tokenNotExpired } from 'angular2-jwt';
// import { AuthHttp, JwtHelper } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

import { JwtModule } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccessService {

  private loggedIn = false;
  public redirectURL = '';

  constructor(private _globalService: GlobalService,
    private _router: Router,
    public jwtHelper: JwtHelperService,
    private _http: HttpClient) {
  }


  public login(username, password) {

    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=UTF-8');

    let params = JSON.stringify({
      "LoginForm": {
        "username": username,
        "password": password
      }
    });

    return this._http.post(this._globalService.apiHost + '/staff/login', params, { headers: headers })
      .map((response: any) => {
        if (response.success == true) {
          localStorage.setItem('user-data', JSON.stringify(response.data));
          localStorage.setItem('dashboard-token', response.data.access_token);
          this.loggedIn = true;
        } else {
          localStorage.removeItem('user-data');
          localStorage.removeItem('dashboard-token');
          this.loggedIn = false;
        }
        return response;
      })
      .catch((error: any) => {

        throw '## Error ##' + JSON.stringify(error);
      })
  }

  public logout(): void {
    localStorage.removeItem('user-data');
    localStorage.removeItem('dashboard-token');
    localStorage.removeItem('vendedor-data');
    localStorage.removeItem('frontend-token');
    localStorage.clear();
    this.loggedIn = false;
    this._router.navigate(['login']);
  }

  public isLoggedIn(): boolean {
    return this.jwtHelper.isTokenExpired('dashboard-token'); // true or false
  }

  public getToken(): any {
    return localStorage.getItem('dashboard-token');
  }

  public getUserData(): any {
    return localStorage.getItem('user-data');
  }

  private checkToken(): any {
    return !!localStorage.getItem('dashboard-token');
  }

  public unauthorizedAccess(error: any): void {
    this.logout();
    this._router.navigate(['login']);
  }

  private handleError(error: Response | any) {

    let errorMessage: any = {};

    // Connection error
    // if (error.status == 0) {
    //   errorMessage = {
    //     success: false,
    //     status: 0,
    //     data: "Lo sentimos, se produjo un error de conexión. Inténtalo de nuevo.",
    //   };
    // }
    // else {
    //   errorMessage = error.json();
    // }
    return Observable.throw(errorMessage);
  }

}
