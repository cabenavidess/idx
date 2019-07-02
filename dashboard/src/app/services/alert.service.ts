import { Injectable } from '@angular/core';
import swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable()
export class AlertService {

  constructor() { }

  alertPro(texto: string) {
    let parent = this;

    swal({
      title: 'Buen trabajo',
      // text: "¡Tus datos del Modulo Categoría de Productos se ha guardado exitosamente!",
      text: texto,
      type: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    })
      .then(function (result) {
      }, function (dismiss) {
      });
  }

  alertProError(texto: string) {
    let parent = this;

    swal({
      title: 'Se ha producido un error',
      // text: "¡Tus datos del Modulo Categoría de Productos se ha guardado exitosamente!",
      text: texto,
      type: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    })
      .then(function (result) {
      }, function (dismiss) {
      });
  }
}
