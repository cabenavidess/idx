import { Observable } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import swal, { SweetAlertOptions } from 'sweetalert2';
import { AlertService } from '../../../services/alert.service';
import { AccessService } from '../../../services/access.service';
import { Sucursal } from '../../../models/sucursal';
import { SucursalService } from '../../../services/sucursal.service';
import { RepresentantenegocioService } from '../../../services/representantenegocio.service';
import { CiudadService } from '../../../services/ciudad.service';


@Component({
  selector: 'app-sucursal-form',
  templateUrl: './sucursal-form.component.html',
  styles: []
})
export class SucursalFormComponent implements OnInit, OnDestroy {

  forma: FormGroup;

  public _mode: string = '';

  private _id: number;
  private _parameters: any;
  private _sucursal: Sucursal;
  _representante;
  _ciudad;

  private _errorMessage: string;
  private _formErrors: any;
  private _submitted: boolean = false;

  constructor(
    private _equipoService: AccessService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _alert: AlertService,
    private _ss: SucursalService,
    private _rn: RepresentantenegocioService,
    private _cs: CiudadService
  ) {
    this.getDataRepresentante();
    this.getDataCiudad();
    // Construct form group
    this.forma = new FormGroup({
      'tab_negocio_sucursal_nombre': new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9-ZñÑáéíóúÁÉÍÓÚ -/_]{3,45}$')
        ]),

      'tab_negocio_sucursal_direccion': new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9-ZñÑáéíóúÁÉÍÓÚ -/_]{3,200}$')
        ]),
      'tab_negocio_sucursal_telefono': new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[0-9]{6,10}$')
        ]),
        'tab_negocio_sucursal_email': new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{3,80}$')
        ]),
        'fk_tab_negocio_representante_id': new FormControl('',
        [
          Validators.required,
        ]),
        'fk_tab_negocio_ciudad_id': new FormControl('',
        [
          Validators.required,
        ]),
    });

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
      this._ss.addCategoria(this._sucursal)
        .subscribe(
          result => {
            if (result.success) {
              this._alert.alertPro('Creación realizada con éxito!');
              this._router.navigate(['/sucursal']);
            } else {
              this._submitted = false;
            }
          },
          error => {
            this._submitted = false;
            // Validation errors
            if (error.status == 422) {
              // let errorFields = JSON.parse(error.data.message);
              this._alert.alertProError('Nombre de sucursal ya existe');
              // this._setFormErrors(errorFields);
            }
            // Unauthorized Access
            else if (error.status == 401 || error.status == 403) {
              this._equipoService.unauthorizedAccess(error);
            }
            // All other errors
            else {
              this._alert.alertProError('Nombre de sucursal ya existe');
              // this._errorMessage = error.data.message;
              

            }
          }
        );
    } else if (this._mode == 'update') {
      this._ss.updateCategoriaById(this._sucursal)
        .subscribe(
          (result: any) => {
            if (result.success) {
              // this.irCategoria();
              // if (this.irCategoria !== null) {
              //     this._router.navigate(['/categoria']);
              // }
              this._alert.alertPro('Actualización realizada con éxito!');
              this._router.navigate(['/sucursal']);
            } else {
              this._submitted = false;
            }
          }, error => {
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
  //         


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
    this._sucursal = new Sucursal();
    this._sucursal.tab_negocio_sucursal_nombre = '';
    this._sucursal.tab_negocio_sucursal_direccion = '';
    this._sucursal.tab_negocio_sucursal_telefono = '';
    this._sucursal.tab_negocio_sucursal_email = '';
    this._sucursal.fk_tab_negocio_representante_id = 0;
    this._sucursal.fk_tab_negocio_ciudad_id = 0;
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
        this._ss.getCategoriaById(this._id)
          .subscribe(
            result => {
              this._sucursal = result;
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
    this._sucursal = new Sucursal();
  }

  getDataRepresentante() {
    this._rn.getAllRepresentantenegocios()
      .subscribe(result => {
        this._representante = result;
        
      })
  }

  getDataCiudad() {
    this._cs.getAllCiudad()
      .subscribe(result => {
        this._ciudad = result;
      })
  }

}
