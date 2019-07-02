import { Observable } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import swal, { SweetAlertOptions } from 'sweetalert2';
import { Ciudad } from '../../models/ciudad';
import { CiudadService } from '../../services/ciudad.service';
import { AccessService } from '../../services/access.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-ciudad-form',
  templateUrl: './ciudad-form.component.html',
  styles: []
})
export class CiudadFormComponent implements OnInit {

  forma: FormGroup;

   _mode: string = '';

   _id: number;
   _parameters: any;
   _ciudad: Ciudad;

   _errorMessage: string;
   _formErrors: any;
   _submitted: boolean = false;

  constructor(private _ciudadService: CiudadService,
    private _equipoService: AccessService,
    private _router: Router,
    private _alert: AlertService,
    private _activatedRoute: ActivatedRoute, ) {

    // Construct form group
    this.forma = new FormGroup({
      'tab_negocio_ciudad_nombre': new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,45}$')
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
      this._ciudadService.addCiudad(this._ciudad)
        .subscribe(
          result => {
            if (result.success) {
              // this._router.navigate(['/ciudad']);
              this._alert.alertPro('Creación realizada con éxito!');

              this._router.navigate(['/ciudad']);

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
              this._equipoService.unauthorizedAccess(error);
            }
            // All other errors
            else {
              this._alert.alertProError('Ciudad ya creada, intente con otro nombre!');
              this._errorMessage = error.data.message;

            }
          }
        );
    } else if (this._mode == 'update') {
      this._ciudadService.updateCiudadById(this._ciudad)
        .subscribe(
          (result: any) => {
            if (result.success) {
              this._alert.alertPro('Actualización realizada con éxito!');
              this._router.navigate(['/ciudad']);

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


  existeCiudad(control: FormControl): Promise<any> | Observable<any> {
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

  private _resetCiudad() {
    this._ciudad = new Ciudad();
    this._ciudad.tab_negocio_ciudad_nombre = '';
  }

  public ngOnInit() {
    this._resetCiudad();

    // _route is activated route service. this._route.params is observable.
    // subscribe is method that takes function to retrieve parameters when it is changed.
    this._parameters = this._activatedRoute.params.subscribe(params => {
      // plus(+) is to convert 'id' to number
      if (typeof params['id'] !== "undefined") {
        this._id = Number.parseInt(params['id']);
        this._errorMessage = "";
        this._ciudadService.getCiudadById(this._id)
          .subscribe(
            result => {
              this._ciudad = result;
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
    this._ciudad = new Ciudad();
  }

}
