import { Observable } from "rxjs/Rx";
import { Component, OnInit, OnDestroy, Pipe } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
// import { ImpuestoService } from "./../../../services/impuesto.service";
// import { Impuesto } from "./../../../models/impuesto";
// import { EquipoService } from "./../../../services/equipo.service";
import * as moment from "moment";
import swal, { SweetAlertOptions } from "sweetalert2";
import { Impuesto } from "../../models/impuesto";
import { ImpuestoService } from "../../services/impuesto.service";
import { AccessService } from "../../services/access.service";
import { AlertService } from "../../services/alert.service";

@Component({
  selector: 'app-impuesto-form',
  templateUrl: './impuesto-form.component.html',
  styles: []
})
export class ImpuestoFormComponent implements OnInit, OnDestroy {
  forma: FormGroup;

  _mode: string = "";

  _id: number;
  _parameters: any;
  _impuesto: Impuesto;

  _errorMessage: string;
  _formErrors: any;
  _submitted: boolean = false;

  constructor(
    private _impuestoService: ImpuestoService,
    private _equipoService: AccessService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _alert: AlertService
  ) {
    // Construct form group
    this.forma = new FormGroup({
      tab_impuestos_iva_nombre: new FormControl("", [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9_% ]{3,45}$')
      ]),

      tab_impuestos_iva_descripcion: new FormControl("", [
        Validators.required,
        Validators.pattern('^[A-Za-z0-9-ZñÑáéíóúÁÉÍÓÚ_% ]{3,45}$')
      ]),

      tab_impuestos_iva_valor: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]+([.])?([0-9]+)?$")
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
    } else if (
      this.forma.controls[field].touched == true &&
      this.forma.controls[field].valid == true
    ) {
      // If the field is touched and valid value, then it is considered as valid.
      isValid = true;
    }

    return isValid;
  }

  private guardarDatos() {
    this._submitted = true;
    if (this._mode == "create") {
      this._impuestoService.addImpuesto(this._impuesto).subscribe(
        result => {
          if (result.success) {
            // this._router.navigate(['/ciudad']);
            this.irImpuesto();
            if (this.irImpuesto !== null) {

              this._router.navigate(["/impuesto"]);
            }
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
          } else if (error.status == 401 || error.status == 403) {
            // Unauthorized Access
            this._equipoService.unauthorizedAccess(error);
          } else {
            // All other errors
            this._errorMessage = error.data.message;
          }
        }
      );
    } else if (this._mode == "update") {
      this._impuestoService.updateImpuestoById(this._impuesto).subscribe(
        (result: any) => {
          if (result.success) {
            // this.irImpuesto();
            // if (this.irImpuesto !== null) {
            //   this._router.navigate(["/impuesto"]);
            // }
            this._alert.alertPro('Actualización realizada con éxito!');
            this._router.navigate(["/impuesto"]);
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
          } else if (error.status == 401 || error.status == 403) {
            // Unauthorized Access
            this._equipoService.unauthorizedAccess(error);
          } else {
            // All other errors
            this._errorMessage = error.data.message;
          }
        }
      );
    }
  }

  public irImpuesto(): void {
    // Debido al problema de alcance de alerta, defina como variable de función y pase a swal

    let parent = this;

    swal({
      title: "Buen trabajo",
      text:
        "¡Tus datos correspondiente al Modulo Impuestos se ha guardado exitosamente!",
      type: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33"
    }).then(
      function (result) {
        // handle confirm, result is needed for modals with input
        // this._router.navigate(['/ciudad']);
      },
      function (dismiss) {
        // dismiss can be "cancel" | "close" | "outside"
      }
    );
  }

  existeImpuesto(control: FormControl): Promise<any> | Observable<any> {
    //Proceso asincrono para verificar mediante un observable
    let promesa = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === "IVA 12%,Ley Orgánica de Solidaridad,0.12") {
          resolve({ existe: true });
        } else {
          resolve(null);
        }
      }, 3000);
    });
    return promesa;
  }

  private _resetImpuesto() {
    this._impuesto = new Impuesto();
    this._impuesto.tab_impuestos_iva_nombre = "";
  }

  public ngOnInit() {
    this._resetImpuesto();

    // _route is activated route service. this._route.params is observable.
    // subscribe is method that takes function to retrieve parameters when it is changed.
    this._parameters = this._activatedRoute.params.subscribe(params => {
      // plus(+) is to convert 'id' to number
      if (typeof params['id'] !== "undefined") {
        this._id = Number.parseInt(params['id']);
        this._errorMessage = "";
        this._impuestoService.getImpuestoById(this._id)
          .subscribe(
            result => {
              this._impuesto = result;

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
    this._impuesto = new Impuesto();
  }
}
