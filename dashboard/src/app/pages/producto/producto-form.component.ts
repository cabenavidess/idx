import { MarcaService } from './../../services/marca.service';
import { AccessService } from './../../services/access.service';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";
import swal, { SweetAlertOptions } from 'sweetalert2';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styles: []
})
export class ProductoFormComponent implements OnInit, OnDestroy {

  forma: FormGroup;

  _mode: string = '';

  _id: number;
  _parameters: any;
  _producto: Producto;
  _marca: any;

  _errorMessage: string;
  _formErrors: any;
  _submitted: boolean = false;

  constructor(private _productoService: ProductoService,
    private _equipoService: AccessService,
    private _sc: MarcaService,
    private _router: Router,
    private _alert: AlertService,
    private _activatedRoute: ActivatedRoute, ) {

    // Construct form group
    this.forma = new FormGroup({
      'tab_producto_codigo': new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9]{4,128}$')
        ]),

      'tab_producto_nombre': new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9-ZñÑáéíóúÁÉÍÓÚ ]{3,45}$')
        ]),

      'tab_producto_descripcion': new FormControl('',
        [
          Validators.required,
          Validators.pattern('^[A-Za-z0-9-ZñÑáéíóúÁÉÍÓÚ -/_]{3,200}$')
        ]),

      'tab_producto_imagen': new FormControl('',
        ),

      'tab_producto_status': new FormControl('',
        [
          Validators.required,
        ]),

      'fk_tab_marca_id': new FormControl('',
        [
          Validators.required
        ]),
      'tab_producto_iva': new FormControl(''),
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
      this._productoService.addProducto(this._producto)
        .subscribe(
          result => {
            if (result.success) {
              // this._router.navigate(['/sucursal']);
              // this.irProducto();
              // if (this.irProducto !== null) {

              //   this._router.navigate(['/producto']);
              // }
              this._alert.alertPro('Creación realizada con éxito!');
              this._router.navigate(['/producto']);
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
              this._alert.alertProError('Código de producto o nombre ya existe');

            }
          }
        );
    } else if (this._mode == 'update') {
      this._productoService.updateProductoById(this._producto)
        .subscribe(
          (result: any) => {
            if (result.success) {
              // this.irProducto();
              // if (this.irProducto !== null) {
              //   this._router.navigate(['/producto']);
              // }
              this._alert.alertPro('Actualización realizada con éxito!');
              this._router.navigate(['/producto']);
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
              this._alert.alertProError('Código de producto ya existe');
              // this._errorMessage = error.data.message;
            }
          }
        );
    }
  }

  public irProducto(): void {
    // Debido al problema de alcance de alerta, defina como variable de función y pase a swal

    let parent = this;

    swal({
      title: 'Buen trabajo',
      text: "¡Tus datos del Modulo Productos se ha guardado exitosamente!",
      type: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then(function (result) {


    }, function (dismiss) {
      // dismiss can be "cancel" | "close" | "outside"
    });
  }


  existeProducto(control: FormControl): Promise<any> | Observable<any> {
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

  private _resetProducto() {
    this._producto = new Producto();
    this._producto.tab_producto_codigo = '';
    this._producto.tab_producto_nombre = '';
    this._producto.tab_producto_descripcion = '';
    this._producto.tab_producto_imagen = '';
    this._producto.tab_producto_status = '';
  }

  public ngOnInit() {
    this._resetProducto();
    this.getAllMarcas();

    // _route is activated route service. this._route.params is observable.
    // subscribe is method that takes function to retrieve parameters when it is changed.
    this._parameters = this._activatedRoute.params.subscribe(params => {
      // plus(+) is to convert 'id' to number
      if (typeof params['id'] !== "undefined") {
        this._id = Number.parseInt(params['id']);
        this._errorMessage = "";
        this._productoService.getProductoById(this._id)
          .subscribe(
            result => {
              this._producto = result;
              this._mode = 'update';
            },
            error => {
              // unauthorized access
              if (error.status == 401 || error.status == 403) {
                this._equipoService.unauthorizedAccess(error);
              } else {
                this._errorMessage = error.data.message;
                // this._alert.alertProError('Cédula ya existe');
              }
            }
          );
      } else {
        this._mode = 'create';

      }
    });
  }

  getAllMarcas() {
    this._sc.getAllMarcasEstado().subscribe(
      result => {
        this._marca = result;
      }
    );
  }


  public ngOnDestroy() {
    this._parameters.unsubscribe();
    this._producto = new Producto();
  }

}
