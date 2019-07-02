import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AccessService } from './access.service';
import { HeadersService } from './headers.service';
import { User } from '../models/user';
import { Staff } from '../models/staff';

@Injectable()
export class UserService {

  constructor(
    private _globalService: GlobalService,
    private _access: AccessService,
    private _http: HttpClient,
    private _headers: HeadersService
  ) {
    this.getAllUsers();
  }

  getAllUsersAdmin() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/staff', { headers })
      .map((response: any) => {
        return <any[]>response.data;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  getAllUsers() {
    let headers = this._headers.getHeaders();
    return this._http.get(this._globalService.apiHost + '/user', { headers })
      .map((response: any) => {
        return <User[]>response.data;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // POST /v1/Cliente
  addUser(user: User): Observable<any> {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(user);
    return this._http.post(
      this._globalService.apiHost + '/user', data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // GET /v1/cliente/1
  getUserById(id: number) {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/user/' + id, { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // PUT /v1/cliente/1
  updateUserById(user: User) {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(user);
    return this._http.put(
      this._globalService.apiHost + '/user/' + user.id, data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // POST /v1/staff
  addStaff(staff: Staff): Observable<any> {
    let headers = this._headers.getHeaders();

    let data = JSON.stringify(staff);
    return this._http.post(
      this._globalService.apiHost + '/staff', data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // GET /v1/staff/1
  getStaffById(id: number): Observable<Staff> {
    let headers = this._headers.getHeaders();
    return this._http.get(
      this._globalService.apiHost + '/staff/' + id, { headers })
      .map((response: any) => {
        return response.data;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  // PUT /v1/staff/1
  updateStaffById(staff: Staff): Observable<any> {
    let headers = this._headers.getHeaders();
    let data = JSON.stringify(staff);
    return this._http.put(
      this._globalService.apiHost + '/staff/' + staff.id, data, { headers })
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

  public static getStatusTypes(): Array<any> {
    return [
      {
        label: 'Activo',
        value: 10
      },
      {
        label: 'Bloqueado',
        value: 0
      }
    ];
  }

  public static getRoleTypes(): Array<any> {
    return [
      {
        label: 'Administrator',
        value: 99
      },
      {
        label: 'Vendedor',
        value: 50
      }
    ];
  }

  public getPermissionTypes() {
    let headers = this._headers.getHeaders();
    // /staff/get-permissions
    return this._http.get(this._globalService.apiHost + '/staff/get-permissions', { headers })
      .map((response: any) => {

        return <any[]>response.data;
      })
      .catch((error: any) => {
         
        throw '## Error ##' + JSON.stringify(error);
      })
  }

}
