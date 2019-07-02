import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
// import { CustomValidators } from 'ng2-validation';
// import { ContainsValidators } from "../shared/contains-validator.directive";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";


// import { StaffDataService } from "../model/staff-data.service";
// import { StaffService } from "../model/staff.service";

import * as moment from "moment";
import * as _ from "underscore";
import { Staff } from '../../../models/staff';
import { AccessService } from '../../../services/access.service';
import { UserService } from '../../../services/user.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styles: []
})
export class AdminFormComponent implements OnInit, OnDestroy {
  public _mode = '';

  public _id: number;
  public _parameters: any;
  public _staff: Staff;

  public _errorMessage: string;

  public _form: FormGroup;
  public _formErrors: any;
  public _submitted: boolean = false;

  // Status Types
  public _statusTypes: any = {};

  // Roles
  private _roleTypes: any = {};
  permissions;
  todayDate;
  dateToday;
  now;

  constructor(private _staffDataService: UserService,
    private _staffService: AccessService,
    private _router: Router,
    private _alert: AlertService,
    private _activatedRoute: ActivatedRoute,
    private _formBuilder: FormBuilder) {

    this.todayDate = new Date();
    this.dateToday = (this.todayDate.getFullYear() + '-' +
      ((this.todayDate.getMonth() + 1)) + '-' 
      + this.todayDate.getDate() + ' '
       + this.todayDate.getHours() + ':' + this.todayDate.getMinutes() + ':' + this.todayDate.getSeconds());


    // this._staff.confirmed_at = this.dateToday;
    // Construct form group
    this._form = _formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_-]{3,15}$'),
      ])],
      email: ['', Validators.compose([
        Validators.required,
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6)
      ])],
      confirmed_at: ['', Validators.compose([])],
      blocked_at: ['', Validators.compose([])],
      role: ['', Validators.compose([
        Validators.required,
        // ContainsValidators.contains('value', StaffDataService.getRoleTypes())
      ])],
      // permissions: _formBuilder.array([]),
      permissions: ['', Validators.compose([

      ])],
      status: ['', Validators.compose([
        Validators.required,
        // Custom validator for checking value against list of values
        // ContainsValidators.contains('value', StaffDataService.getStatusTypes())
      ])],
    }, {
        validator: validateDateTime(['confirmed_at', 'blocked_at'])
      });

    this._statusTypes = UserService.getStatusTypes();
    this._roleTypes = UserService.getRoleTypes();

    this._form.valueChanges
      .subscribe(data => this.onValueChanged(data));

  }

  private _setFormErrors(errorFields: any): void {
    for (let key in errorFields) {
      let errorField = errorFields[key];
      // skip loop if the property is from prototype
      if (!this._formErrors.hasOwnProperty(key)) continue;

      // let message = errorFields[error.field];
      this._formErrors[key].valid = false;
      this._formErrors[key].message = errorField;
    }
  }

  private _resetFormErrors(): void {
    this._formErrors = {
      username: { valid: true, message: '' },
      email: { valid: true, message: '' },
      password: { valid: true, message: '' },
      confirmed_at: { valid: true, message: '' },
      blocked_at: { valid: true, message: '' },
      role: { valid: true, message: '' },
      permissions: { valid: true, message: '' },
      status: { valid: true, message: '' },

    };
  }

  private _isValid(field): boolean {
    let isValid: boolean = false;

    // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
    if (this._form.controls[field].touched == false) {
      isValid = true;
    }
    // If the field is touched and valid value, then it is considered as valid.
    else if (this._form.controls[field].touched == true && this._form.controls[field].valid == true) {
      isValid = true;
    }

    return isValid;
  }

  public onValueChanged(data?: any) {
    if (!this._form) { return; }
    const form = this._form;
    for (let field in this._formErrors) {
      // clear previous error message (if any)
      let control = form.get(field);
      if (control && control.dirty) {
        this._formErrors[field].valid = true;
        this._formErrors[field].message = '';
      }
    }
  }

  private _resetStaff() {
    this._staff = new Staff();
    this._staff.username = '';
    this._staff.email = '';
    this._staff.password = '';
    this._staff.confirmed_at = '';
    this._staff.blocked_at = '';
    this._staff.role = 50;
    this._staff.permissions = [];
    this._staff.status = 10;
  }

  public ngOnInit() {
    this._resetFormErrors();
    this._resetStaff();


    // _route is activated route service. this._route.params is observable.
    // subscribe is method that takes function to retrieve parameters when it is changed.
    this._parameters = this._activatedRoute.params.subscribe(params => {
      // plus(+) is to convert 'id' to number
      if (typeof params['id'] !== "undefined") {
        this._id = Number.parseInt(params['id']);
        this._errorMessage = "";
        this._staffDataService.getStaffById(this._id)
          .subscribe(
            staff => {
              this._staff = staff;
              this._mode = 'update';
            },
            error => {
              // unauthorized access
              if (error.status == 401 || error.status == 403) {
                this._staffService.unauthorizedAccess(error);
              } else {
                this._errorMessage = error.data.message;
              }
            }
          );
      } else {
        this._mode = 'create';

        this._staffDataService.getPermissionTypes()
          .subscribe(
            result => {
              this.permissions = result;

              if (this.permissions.length > 0) {
                this.permissions.forEach((permission, index) => {
                  this.permissions[index]['checked'] = true;
                });
              }

              this._staff.permissions = this.permissions;

            },
            error => {
              // unauthorized access
              if (error.status == 401 || error.status == 403) {
                this._staffService.unauthorizedAccess(error);
              } else {
                this._errorMessage = error.data.message;
              }
            }
          );
      }
    });
  }

  public ngOnDestroy() {
    this._parameters.unsubscribe();
    this._staff = new Staff();
  }

  public onSubmit() {
    this._submitted = true;
    this._resetFormErrors();
    if (this._mode == 'create') {
      this._staffDataService.addStaff(this._staff)
        .subscribe(
          result => {
            if (result.success) {
              this._alert.alertPro('Creación realizada con éxito!');
              this._router.navigate(['/user/admin']);
            } else {
              this._submitted = false;
            }
          },
          error => {
            this._submitted = false;
            // Validation errors
            if (error.status == 422) {
              this._alert.alertProError("Usuario o email duplicados");
              let errorFields = JSON.parse('Error de ingreso', error.data);
              this._setFormErrors(errorFields);
            }
            // Unauthorized Access
            if (error.status == 401 || error.status == 403) {
              this._alert.alertProError("Sin Autorización");
              this._staffService.unauthorizedAccess(error);
            }
            // All other errors
            else {
              // this._errorMessage = error.data.message;
              this._alert.alertProError("Usuario o email duplicados");
            }
          }
        );
    } else if (this._mode == 'update') {
      this._staffDataService.updateStaffById(this._staff)
        .subscribe(
          result => {
            if (result.success) {
              this._alert.alertPro('Actualización realizada con éxito!');
              this._router.navigate(['/user/admin']);
            } else {
              this._submitted = false;
            }
          },
          error => {
            this._submitted = false;
            // Validation errors
            if (error.status == 422) {
              let errorFields = JSON.parse(error.data.message);
              this._setFormErrors(errorFields);
              //this._setFormErrors(error.data);
            }
            // Unauthorized Access
            else if (error.status == 401 || error.status == 403) {
              this._staffService.unauthorizedAccess(error);
            }
            // All other errors
            else {
              this._errorMessage = error.data.message;
            }
          }
        );
    }
  }

  public valuechange(type: string, dateTime) {


    this.now = new Date("YYYY-MM-DD HH:mm:ss");


    if (type == 'confirmed_at') {
      this._staff.confirmed_at = '2018-08-03 09:01:01';
    } else if (type == 'blocked_at') {
      this._staff.blocked_at = this.dateToday;
    }
  }
}

function validateDateTime(fieldKeys: any) {
  return (group: FormGroup) => {
    for (let i = 0; i < fieldKeys.length; i++) {
      let field = group.controls[fieldKeys[i]];
      if (typeof field !== "undefined" && (field.value != "" && field.value != null)) {
        if (moment(field.value, "YYYY-MM-DD HH:mm:ss", true).isValid() == false) {
          return field.setErrors({ validateDateTime: true });
        }
      }
    }
  }
}
