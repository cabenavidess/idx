import { RepresentantenegocioService } from './../../services/representantenegocio.service';
import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
// import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs/Rx';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { RepresentanteNegocio } from './../../models/representante';


import { AccessService } from './../../services/access.service';
import { AlertService } from '../../services/alert.service';

// import swal, { SweetAlertOptions } from 'sweetalert2';


@Component({
    templateUrl: "./representantenegocio-form.component.html"
})
export class RepresentantenegocioFormComponent implements OnInit, OnDestroy {
    forma: FormGroup;

    _mode: string = "";

    _id: number;
    _parameters: any;
    _representantenegocio: RepresentanteNegocio;

    _errorMessage: string;
    _formErrors: any;
    _submitted: boolean = false;

    constructor(
        private _representantenegocioService: RepresentantenegocioService,
        private _access: AccessService,
        //private _equipoService: EquipoService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _alert: AlertService
    ) {
        // Construct form group
        this.forma = new FormGroup({

            'tab_negocio_representante_ruc_ci': new FormControl('',
                [
                    Validators.required,
                    Validators.pattern('^[0-9]{10,13}$')
                ]),

            'tab_negocio_representante_nombre': new FormControl('',
                [
                    Validators.required,
                    Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{4,45}$')
                ])
        });

        // this.forma.controls['tab_negocio_ciudad_nombre'].setAsyncValidators([
        //     this.existeCiudad,
        // ]);
    }

    private _isValid(field): boolean {
        let isValid: boolean = false;
        // If the field is not touched and invalid, it is considered as initial loaded form. Thus set as true
        if (this.forma.controls[field].touched == false) {
            isValid = true;
        }
        // If the field is touched and valid value, then it is considered as valid.
        else if (this.forma.controls[field].touched == true && this.forma.controls[field].valid == true) {
            isValid = true;
        }
        return isValid;
    }

    private guardarDatos() {
        this._submitted = true;

        if (this._mode == 'create') {
            this._representantenegocioService.addRepresentantenegocio(this._representantenegocio)
                .subscribe(
                    result => {
                        if (result.success) {
                            this._alert.alertPro('Creación realizada con éxito!');
                            this._router.navigate(['/representantenegocio']);
                        } else {
                            this._submitted = false;
                            this._alert.alertProError('Representante ya existe');
                        }
                    },
                    error => {
                        this._submitted = false;
                        // Validation errors
                        if (error.status == 422) {
                            let errorFields = JSON.parse(error.data.message);
                            // this._alert.alertProError('Representante ya existe');
                            // this._setFormErrors(errorFields);
                        }
                        // Unauthorized Access
                        else if (error.status == 401 || error.status == 403) {
                            this._access.unauthorizedAccess(error);
                        }
                        // All other errors
                        else {
                            this._errorMessage = error.data.message;

                        }
                    }
                );
        } else if (this._mode == 'update') {
            this._representantenegocioService.updateRepresentantenegocioById(this._representantenegocio)
                .subscribe(
                    (result: any) => {
                        if (result.success) {
                            // this.irCategoria();
                            // if (this.irCategoria !== null) {
                            //     this._router.navigate(['/categoria']);
                            // }
                            this._alert.alertPro('Actualización realizada con éxito!');
                            this._router.navigate(['/representantenegocio']);
                        } else {
                            this._submitted = false;
                        }


                    },
                    error => {
                        this._submitted = false;
                        // Validation errors
                        if (error.status == 422) {
                            let errorFields = JSON.parse(error.data.message);
                            // this._setFormErrors(errorFields);
                            // this._setFormErrors(error.data);
                        }
                        // Unauthorized Access
                        else if (error.status == 401 || error.status == 403) {
                            this._access.unauthorizedAccess(error);
                        }
                        // All other errors
                        else {
                            this._alert.alertProError('Representante ya existe');
                            this._errorMessage = error.data.message;
                        }
                    }
                );
        }
    }

    private _resetRepresentantenegocio() {
        this._representantenegocio = new RepresentanteNegocio();
        this._representantenegocio.tab_negocio_representante_ruc_ci = '';
        this._representantenegocio.tab_negocio_representante_nombre = '';

    }

    public ngOnInit() {
        this._resetRepresentantenegocio();
        this._parameters = this._activatedRoute.params.subscribe(params => {
            if (typeof params['id'] !== "undefined") {
                this._id = Number.parseInt(params['id']);
                this._errorMessage = "";
                this._representantenegocioService.getRepresentantenegocioById(this._id)
                    .subscribe(
                        result => {
                            this._representantenegocio = result;
                            this._mode = 'update';
                        },
                        error => {
                            // unauthorized access
                            if (error.status == 401 || error.status == 403) {
                                this._access.unauthorizedAccess(error);
                            } else {
                                this._errorMessage = error.data.message;
                            }
                        }
                    );
            } else {
                this._mode = 'create';

            }
        });
    }

    public ngOnDestroy() {
        this._parameters.unsubscribe();
        this._representantenegocio = new RepresentanteNegocio();
    }


}