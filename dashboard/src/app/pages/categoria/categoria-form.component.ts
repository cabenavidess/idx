import { Observable } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import swal, { SweetAlertOptions } from 'sweetalert2';
import { CategoriaService } from '../../services/categoria.service';
import { AccessService } from '../../services/access.service';
import { Categoria } from './../../models/categoria';
import { AlertService } from '../../services/alert.service';

@Component({
    templateUrl: './categoria-form.component.html',
})

export class CategoriaFormComponent implements OnInit, OnDestroy {

    forma: FormGroup;

    public _mode: string = '';

    private _id: number;
    private _parameters: any;
    private _categoria: Categoria;

    private _errorMessage: string;
    private _formErrors: any;
    private _submitted: boolean = false;

    constructor(private _categoriaService: CategoriaService,
        private _equipoService: AccessService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _alert: AlertService
    ) {

        // Construct form group
        this.forma = new FormGroup({
            'tab_categoria_nombre': new FormControl('',
                [
                    Validators.required,
                    Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,45}$')
                ]),

            'tab_categoria_descripcion': new FormControl('',
                [
                    Validators.required,
                    Validators.pattern('^[A-Za-z0-9-ZñÑáéíóúÁÉÍÓÚ -/_]{3,200}$')
                ]),

            'tab_categoria_status': new FormControl('',
                [
                    Validators.required,
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
            this._categoriaService.addCategoria(this._categoria)
                .subscribe(
                    result => {
                        if (result.success) {
                            this._alert.alertPro('Creación realizada con éxito!');
                            // this._router.navigate(['/ciudad']);
                            // this.irCategoria();
                            // if (this.irCategoria !== null) {

                                 this._router.navigate(['/categoria']);
                            // }

                        } else {
                            this._submitted = false;
                        }
                    },
                    error => {
                        this._submitted = false;
                        // Validation errors
                        if (error.status == 422) {
                            // let errorFields = JSON.parse(error.data.message);
                            this._alert.alertProError('Nombre de categoria ya existe');
                            // this._setFormErrors(errorFields);
                        }
                        // Unauthorized Access
                        else if (error.status == 401 || error.status == 403) {
                            this._equipoService.unauthorizedAccess(error);
                        }
                        // All other errors
                        else {
                            this._alert.alertProError('Nombre de categoria ya existe');
                            // this._errorMessage = error.data.message;

                        }
                    }
                );
        } else if (this._mode == 'update') {
            this._categoriaService.updateCategoriaById(this._categoria)
                .subscribe(
                    (result: any) => {
                        if (result.success) {
                            // this.irCategoria();
                            // if (this.irCategoria !== null) {
                            //     this._router.navigate(['/categoria']);
                            // }
                            this._alert.alertPro('Actualización realizada con éxito!');
                            this._router.navigate(['/categoria']);
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
                            this._equipoService.unauthorizedAccess(error);
                        }
                        // All other errors
                        else {
                            this._errorMessage = error.data.message;
                        }
                    }
                );
        }
    }

    // public irCategoria(): void {
    //     // Debido al problema de alcance de alerta, defina como variable de función y pase a swal

    //     let parent = this;

    //     swal({
    //         title: 'Buen trabajo',
    //         text: "¡Tus datos del Modulo Categoría de Productos se ha guardado exitosamente!",
    //         type: 'success',
    //         showCancelButton: false,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //     }).then(function (result) {
    //         // handle confirm, result is needed for modals with input
    //         // this._router.navigate(['/ciudad']);


    //     }, function (dismiss) {
    //         // dismiss can be "cancel" | "close" | "outside"
    //     });
    // }


    existeCategoria(control: FormControl): Promise<any> | Observable<any> {
        //Proceso asincrono para verificar mediante un observable
        let promesa = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    if (control.value === 'quito') {
                        resolve({ existe: true })
                    } else {
                        resolve(null)
                    }
                }, 3000)
            }
        )
        return promesa;
    }

    private _resetCategoria() {
        this._categoria = new Categoria();
        this._categoria.tab_categoria_nombre = '';
        this._categoria.tab_categoria_descripcion = '';
        this._categoria.tab_categoria_status = '';
    }

    public ngOnInit() {
        this._resetCategoria();


        // _route is activated route service. this._route.params is observable.
        // subscribe is method that takes function to retrieve parameters when it is changed.
        this._parameters = this._activatedRoute.params.subscribe(params => {
            // plus(+) is to convert 'id' to number
            if (typeof params['id'] !== "undefined") {
                this._id = Number.parseInt(params['id']);
                this._errorMessage = "";
                this._categoriaService.getCategoriaById(this._id)
                    .subscribe(
                        result => {
                            this._categoria = result;
                            this._mode = 'update';
                        },
                        error => {
                            // unauthorized access
                            if (error.status == 401 || error.status == 403) {
                                this._equipoService.unauthorizedAccess(error);
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
        this._categoria = new Categoria();
    }

}
