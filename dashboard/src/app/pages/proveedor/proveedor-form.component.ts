import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
// import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs/Rx';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { Proveedor } from './../../models/proveedor';
import { ProveedorService } from './../../services/proveedor.service';
import { AccessService } from './../../services/access.service';
import { AlertService } from '../../services/alert.service';

// import swal, { SweetAlertOptions } from 'sweetalert2';


@Component({
    templateUrl: "./proveedor-form.component.html"
})
export class ProveedorFormComponent implements OnInit, OnDestroy {
    forma: FormGroup;

    _mode: string = "";

    _id: number;
    _parameters: any;
    _proveedor: Proveedor;

    _errorMessage: string;
    _formErrors: any;
    _submitted: boolean = false;

    constructor(
        private _proveedorService: ProveedorService,
        private _access: AccessService,
        //private _equipoService: EquipoService,
        private _router: Router,
        private _alert: AlertService,
        private _activatedRoute: ActivatedRoute
    ) {
        // Construct form group
        this.forma = new FormGroup({

            'tab_proveedor_mercaderia_ruc': new FormControl('',
                [
                    Validators.required,
                    Validators.pattern('^[0-9]{10,13}$')
                ]),

            'tab_proveedor_mercaderia_nombre': new FormControl('',
                [
                    Validators.required,
                    Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,65}$')
                ]),

            'tab_proveedor_mercaderia_empresa': new FormControl('',
                [
                    Validators.required,
                    Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,65}$')
                ]),

            'tab_proveedor_mercaderia_responsable': new FormControl('',
                [
                    Validators.required,
                    Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ -/_:.]{3,65}$')
                ]),


            'tab_proveedor_mercaderia_telefono': new FormControl('',
                [
                    Validators.required,
                    Validators.pattern('^[0-9 -/]{9,15}$')
                ]),


            'tab_proveedor_mercaderia_direccion': new FormControl('',
                [
                    Validators.required,
                    Validators.pattern('^[A-Za-z0-9-ZñÑáéíóúÁÉÍÓÚ -/_:.]{3,200}$')
                ]),



            'tab_proveedor_mercaderia_email': new FormControl('',
                [
                    Validators.required,
                    Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{3,80}$')
                ]),

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
            this._proveedorService.addProveedor(this._proveedor)
                .subscribe(
                    result => {
                        if (result.success) {
                            // this._router.navigate(['/ciudad']);
                            // this.irProveedor();
                            // if (this.irProveedor !== null) {

                            //     this._router.navigate(['/proveedor']);
                            // }
                            this._alert.alertPro('Creación realizada con éxito!');
                            this._router.navigate(['/proveedor']);
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
                        }
                        // Unauthorized Access
                        else if (error.status == 401 || error.status == 403) {
                            this._access.unauthorizedAccess(error);
                        }
                        // All other errors
                        else {
                            this._alert.alertProError('Cédula de proveedor ya existe');
                            this._errorMessage = error.data.message;

                        }
                    }
                );
        } else if (this._mode == 'update') {
            this._proveedorService.updateProveedorById(this._proveedor)
                .subscribe(
                    (result: any) => {

                        if (result.success) {
                            // this.irProveedor();
                            // if (this.irProveedor !== null) {
                            //     this._router.navigate(['/proveedor']);
                            // }
                            this._alert.alertPro('Actualización realizada con éxito!');
                            this._router.navigate(['/proveedor']);
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
                            this._errorMessage = error.data.message;
                        }
                    }
                );
        }
    }

    public irProveedor(): void {
        // Debido al problema de alcance de alerta, defina como variable de función y pase a swal

        // let parent = this;

        // swal({
        //     title: 'Buen trabajo',
        //     text: "¡Tus datos del Modulo Cliente se ha guardado exitosamente!",
        //     type: 'success',
        //     showCancelButton: false,
        //     confirmButtonColor: '#3085d6',
        //     cancelButtonColor: '#d33',
        // }).then(function (result) {
        //     // handle confirm, result is needed for modals with input
        //     // this._router.navigate(['/ciudad']);


        // }, function (dismiss) {
        //     // dismiss can be "cancel" | "close" | "outside"
        // });
    }

    private _resetProveedor() {
        this._proveedor = new Proveedor();
        this._proveedor.tab_proveedor_mercaderia_ruc = '';
        this._proveedor.tab_proveedor_mercaderia_nombre = '';
        this._proveedor.tab_proveedor_mercaderia_empresa = '';
        this._proveedor.tab_proveedor_mercaderia_responsable = '';
        this._proveedor.tab_proveedor_mercaderia_telefono = '';
        this._proveedor.tab_proveedor_mercaderia_direccion = '';
        this._proveedor.tab_proveedor_mercaderia_email = '';
    }

    public ngOnInit() {
        this._resetProveedor();
        this._parameters = this._activatedRoute.params.subscribe(params => {
            if (typeof params['id'] !== "undefined") {
                this._id = Number.parseInt(params['id']);
                this._errorMessage = "";
                this._proveedorService.getProveedorById(this._id)
                    .subscribe(
                        result => {
                            this._proveedor = result;
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
        this._proveedor = new Proveedor();
    }


}