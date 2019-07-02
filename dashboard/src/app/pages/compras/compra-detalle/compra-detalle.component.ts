import { Detalles } from './../../../models/detalles.1';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComprasService } from '../../../services/compras.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AlertService } from '../../../services/alert.service';
import swal, { SweetAlertOptions } from 'sweetalert2';
import { HeadersService } from '../../../services/headers.service';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-compra-detalle',
  templateUrl: './compra-detalle.component.html',
  styles: []
})
export class CompraDetalleComponent implements OnInit {

  data;
  detalles: any = [];
  totalamount;
  id;
  estado: boolean = false;

  ruta: string;
  id_user;
  user_data

  constructor(
    private _activateRoute: ActivatedRoute,
    private _cs: ComprasService,
    private _router: Router,
    private http: HttpClient,
    private _alert: AlertService,
    private _headers: HeadersService,
    private _gs: GlobalService
  ) {
    this.ruta = this._gs.urlGlobalService + '/compras/anularcompra'

    this.user_data = localStorage.getItem("user-data");
    this.id_user = JSON.parse(this.user_data);

    this._activateRoute.params.subscribe(
      (params) => {
        this.id = params['id'];

        this._cs.getCategoriaById(params['id'])
          .subscribe(
            (result: any) => {
              // this.data = result;
              this.data = result.compras;
              this.detalles = result.detalles;
              let sum = 0;
              if (this.data.estado == 'REGISTRADA') {
                this.estado = true;
              }
              else {
                this.estado = false;
              }
              for (let i = 0; i < this.detalles.length; i++) {
                sum += parseFloat(this.detalles[i].detalle_compra_valor_total);
              }

              this.totalamount = sum;
            },
            error => {

            }
          )
      }
    )
  }

  ngOnInit() {
  }

  anularCompra(id) {
    let body = JSON.stringify(id);
    let httpParams = new HttpParams()
      .append("id", body)

    let headers = this._headers.getHeaders();
    this.http.post(this.ruta, httpParams)
      .subscribe(
        (data: any) => {
          if (data.success == true) {
            this._alert.alertPro(data.data.message);
            this._router.navigate(['/compras/']);
          } else {
            this._alert.alertProError(data.data.message);
          }
        }
      )
  }


  printContent() {
    let popupWin = window.open('', '_blank', 'width=1080,height=595');
    let printContents = document.getElementById("kick-start").innerHTML;
    popupWin.document
      .write('<html><head>' +
        '<link rel="stylesheet" type="text/css" href="/test.component.css"/>' +
        '</head><body onload="window.print();">'
        + printContents + '</body></html>');

    popupWin.document.close();
  }



  alertProDeleteCompra(id) {
    swal({
      title: 'Esta seguro de anular la compra?',
      text: "No puede revertir la anulación una vez realizada!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, deseo anular!'
    }).then((result) => {

      let usr_id_local = this.id_user.id;

      if (result.value == true) {

        const obj: any = {
          id: id,
          user_id: usr_id_local
        }

        let body = JSON.stringify(obj);

        let httpParams = new HttpParams()
          .append("anulacion", body)

        this.http.post(this.ruta, httpParams)
          .subscribe(
            (data: any) => {
              if (data.success == true) {
                this._alert.alertPro(data.data.message);
                this._router.navigate(['/compras/lista']);
              } else {
                // this._alert.alertProError(data.data.message);
              }
            }
          )
      } else {
      }

      // if (result.value) {
      //   swal(
      //     'Deleted!',
      //     'Your file has been deleted.',
      //     'success'
      //   )
      // }
    })
  }
}
