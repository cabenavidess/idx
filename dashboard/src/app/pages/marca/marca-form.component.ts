import { Observable } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import swal, { SweetAlertOptions } from 'sweetalert2';
import { Marca } from '../../models/marca';
import { MarcaService } from '../../services/marca.service';
import { AccessService } from '../../services/access.service';
import { CategoriaService } from '../../services/categoria.service';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-marca-form',
    templateUrl: './marca-form.component.html',
    styles: []
})
export class MarcaFormComponent implements OnInit, OnDestroy {

    forma: FormGroup;

    _mode: string = '';

    _id: number;
    _parameters: any;
    _marca: Marca;
    _categoria: any;

    _errorMessage: string;
    _formErrors: any;
    _submitted: boolean = false;

    constructor(private _marcaService: MarcaService,
        private _equipoService: AccessService,
        private _sc: CategoriaService,
        private _router: Router,
        private _alert: AlertService,
        private _activatedRoute: ActivatedRoute, ) {

        // Construct form group
        this.forma = new FormGroup({

            'tab_marca_nombre': new FormControl('',
                [
                    Validators.required,
                    Validators.pattern('^[A-Za-z0-9-ZñÑáéíóúÁÉÍÓÚ -/_]{3,45}$')
                ]),

            'tab_marca_descripcion': new FormControl('',
                [
                    Validators.required,
                    Validators.pattern('^[A-Za-z0-9-ZñÑáéíóúÁÉÍÓÚ -/_]{3,200}$')
                ]),

            'tab_marca_status': new FormControl('',
                [
                    Validators.required
                ]),

            'fk_tab_categoria_id': new FormControl('',
                [
                    Validators.required
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
            this._marcaService.addMarca(this._marca)
                .subscribe(
                    result => {
                        if (result.success) {
                            // this._router.navigate(['/sucursal']);
                            // this.irMarca();
                            // if (this.irMarca !== null) {

                            //     this._router.navigate(['/marca']);
                            // }
                            this._alert.alertPro('Creación realizada con éxito!');
                            this._router.navigate(['/marca']);
                        } else {
                            this._submitted = false;
                        }
                    },
                    error => {
                        this._submitted = false;
                        // Validation errors
                        if (error.status == 422) {
                            this._alert.alertProError('Nombre de marca ya existe');
                            let errorFields = JSON.parse(error.data.message);
                            // this._setFormErrors(errorFields);
                        }
                        // Unauthorized Access
                        else if (error.status == 401 || error.status == 403) {
                            this._equipoService.unauthorizedAccess(error);
                        }
                        // All other errors
                        else {
                            this._alert.alertProError('Nombre de marca ya existe');
                            this._errorMessage = error.data.message;

                        }
                    }
                );
        } else if (this._mode == 'update') {
            this._marcaService.updateMarcaById(this._marca)
                .subscribe(
                    (result: any) => {
                        if (result.success) {
                            // this.irMarca();
                            // if (this.irMarca !== null) {
                            //     this._router.navigate(['/marca']);
                            // }
                            this._alert.alertPro('Actualización realizada con éxito!');
                            this._router.navigate(['/marca']);
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

    public irMarca(): void {
        // Debido al problema de alcance de alerta, defina como variable de función y pase a swal

        let parent = this;

        swal({
            title: 'Buen trabajo',
            text: "¡Tus datos del Modulo Marca se ha guardado exitosamente!",
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then(function (result) {


        }, function (dismiss) {
            // dismiss can be "cancel" | "close" | "outside"
        });
    }


    existeMarca(control: FormControl): Promise<any> | Observable<any> {
        //Proceso asincrono para verificar mediante un observable
        let promesa = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    if (control.value === 'Induxion,La Plaza Shopping - Ave. Mariano Acosta Ibarra') {
                        resolve({ existe: true })
                    } else {
                        resolve(null)
                    }
                }, 3000)
            }
        )
        return promesa;
    }

    private _resetMarca() {
        this._marca = new Marca();
        this._marca.tab_marca_nombre = '';
        this._marca.tab_marca_descripcion = '';
        this._marca.tab_marca_status = '';
    }

    public ngOnInit() {
        this._resetMarca();
        this.getAllCategorias();

        // _route is activated route service. this._route.params is observable.
        // subscribe is method that takes function to retrieve parameters when it is changed.
        this._parameters = this._activatedRoute.params.subscribe(params => {
            // plus(+) is to convert 'id' to number
            if (typeof params['id'] !== "undefined") {
                this._id = Number.parseInt(params['id']);
                this._errorMessage = "";
                this._marcaService.getMarcaById(this._id)
                    .subscribe(
                        result => {
                            this._marca = result;
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


    getAllCategorias() {
        this._sc.getAllCategoriasActive().subscribe(
            result => {
                this._categoria = result;
            }
        );
    }


    public ngOnDestroy() {
        this._parameters.unsubscribe();
        this._marca = new Marca();
    }

}
