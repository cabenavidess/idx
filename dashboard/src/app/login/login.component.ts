import { Component, AfterViewInit, OnInit, NgModule, Injectable, Inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AccessService } from './../services/access.service';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

    _loginForm: FormGroup;
    _formErrors: any;
    _submitted: boolean = false;
    _errorMessage: string = '';

    constructor(
        public _router: Router,
        private _globalService: GlobalService,
        private _access: AccessService,
        private _alert: AlertService,
        public _formBuilder: FormBuilder) {
        this._loginForm = _formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        });
        this._loginForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
    }

    ngAfterViewInit() {
        $(function () {
            $(".preloader").fadeOut();
        });
        $(function () {
            (<any>$('[data-toggle="tooltip"]')).tooltip()
        });
        $('#to-recover').on("click", function () {
            $("#loginform").slideUp();
            $("#recoverform").fadeIn();
        });
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }


    public _setFormErrors(errorFields: any): void {
        for (let key in errorFields) {
            // skip loop if the property is from prototype
            if (!errorFields.hasOwnProperty(key)) continue;

            let message = errorFields[key];
            this._formErrors[key].valid = false;
            this._formErrors[key].message = message;
        }
    }

    public _resetFormErrors(): void {
        this._formErrors = {
            username: { valid: true, message: '' },
            password: { valid: true, message: '' },
        };
    }

    public _isValid(field): boolean {
        let isValid: boolean = false;

        // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
        if (this._loginForm.controls[field].touched == false) {
            isValid = true;
        }
        // If the field is touched and valid value, then it is considered as valid.
        else if (this._loginForm.controls[field].touched == true && this._loginForm.controls[field].valid == true) {
            isValid = true;
        }
        return isValid;
    }

    public onValueChanged(data?: any) {
        if (!this._loginForm) { return; }
        const form = this._loginForm;
        for (let field in this._formErrors) {
            // clear previous error message (if any)
            let control = form.get(field);
            if (control && control.dirty) {
                this._formErrors[field].valid = true;
                this._formErrors[field].message = '';
            }
        }
    }

    ngOnInit() {
        this._resetFormErrors();
        this._access.logout();
    }

    public onSubmit(elementValues: any) {
        this._submitted = true;
        this._access.login(elementValues.username, elementValues.password)
            .subscribe(
                result => {
                    if (result.success) {
                        this._router.navigate(['/']);
                    } else {
                        this._errorMessage = 'Staffname or password is incorrect.';
                        this._submitted = false;
                    }

                },
                error => {

                    this._submitted = false;
                    // Validation error
                    if (error.status == 422) {
                        this._resetFormErrors();
                        this._errorMessage = "There was an error on submission. Please check again.";
                        let errorFields = JSON.parse(error.data.message);
                        this._setFormErrors(errorFields);
                    } else {
                        this._errorMessage = error.data;
                        this._alert.alertProError('Contraseña o usuario incorrecto!');
                    }
                }
            );
    }

    public resolved(captchaResponse: string) {
    }

}
