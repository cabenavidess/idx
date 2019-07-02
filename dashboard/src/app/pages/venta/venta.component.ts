import { HttpClient, HttpParams } from '@angular/common/http'
import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SucursalService } from '../../services/sucursal.service';
import { ProveedorService } from '../../services/proveedor.service';
import { ProductoService } from '../../services/producto.service';
import { HeadersService } from '../../services/headers.service';

import { Hero, states } from '../compras/data-model';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { SelectModule } from 'ng2-select';
import { Venta } from './../../models/venta';
import { Vdetalles } from '../../models/vdetalles';
import { ClienteService } from '../../services/cliente.service';
import { FormaPagoService } from '../../services/forma-pago.service';
import { StockService } from '../../services/stock.service';
import { PosService } from '../../services/pos.service';
import { Item } from '../../models/item';
import { ImpuestoService } from '../../services/impuesto.service';
import { VentasService } from '../../services/ventas.service';
import { GlobalService } from '../../services/global.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styles: []
})
export class VentaComponent implements OnChanges {

  @Input() hero: Venta;

  compraForm: FormGroup;
  states = states;
  _proveedor;
  _producto;
  _cliente
  compra;
  fk_tab_producto_id = 1;
  fk_sucursal_id = 1;
  venta_detalle_cantidad = 0;
  venta_detalle_valor_unit = 0;
  venta_detalle_descuento = 0;
  venta_detalle_total = 0;
  var = 0;
  vu;
  cant;
  fechaActual = new Date();
  data;
  ruta: string;
  private errorMessage: any;
  cantidad;
  _formaPago;
  misdetalles;
  term;
  termClient;
  _clienteid = 1;
  clienteci = 99999999;
  clientename = 'Consumidor Final';
  clientedir = 'N/A';

  products = [];
  productTypes = ['Hogar', 'Deportes'];
  ticket: Item[];
  cartTotal = 0;
  cartTotalSinIva = 0;
  cartTotalConIva = 0;
  cartNumItems = 0;
  items;
  iva: any;
  subt: any;
  _ivaImpuesto;
  _iva: number = 0.0;
  subtTotales;
  descuentito: any;
  _countFact;
  user_data;
  id_user;
  postForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _sucursalService: SucursalService,
    private _proveedorService: ProveedorService,
    private _productoService: ProductoService,
    private http: HttpClient,
    private _headers: HeadersService,
    private _alert: AlertService,
    private _router: Router,
    private _ss: StockService,
    public _clienteService: ClienteService,
    public _formaPagoService: FormaPagoService,
    private ticketSync: PosService,
    private _is: ImpuestoService,
    private _vs: VentasService,
    private _gs: GlobalService
  ) {

    this.ruta = this._gs.urlGlobalService + '/ventas/guardafactura';

    this.createForm();
    this.getAllProveedores();
    this.getAllProductos();
    this.getFormaPago();
    this.getCliente();
    this.getIva();
    // this.refreshPage();
    // this.getNroFact();
    // this.arrayObj();

    this.ticketSync.currentTicket.subscribe(data => this.ticket = data);
    this.ticketSync.currentTotal.subscribe(total => this.cartTotal = total);
    this.ticketSync.currentCartNum.subscribe(num => this.cartNumItems);

    // user-data
    this.user_data = localStorage.getItem("user-data");
    this.id_user = JSON.parse(this.user_data)

  }

  createForm() {
    this.compraForm = this.fb.group({
      fk_sucursal_id: 1,
      fk_tab_cliente_id: 0,
      venta_datos_nro_factura: 0,
      venta_datos_fecha: '',
      fk_forma_pago_id: 0,
      venta_datos_subtotal: 0,
      venta_datos_subtotal_cero: 0,
      venta_datos_iva: 0,
      venta_datos_total: 0,
      detalles: this.fb.array([])
    });
  }

  ngOnChanges() {
    this.setAddresses(this.hero.detalles);
  }

  get detalles(): FormArray {
    return this.compraForm.get('detalles') as FormArray;
  };

  setAddresses(addresses: Vdetalles[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);

    this.compraForm.setControl('detalles', addressFormArray);
  }

  addLair() {

    this.detalles.push(this.fb.group(new Vdetalles()));
  }

  removeLair() {
    this.detalles.removeAt(1);
  }

  onSubmit() {
    this.hero = this.prepareSaveHero();


    // this.heroService.saveHero(this.hero).subscribe(/* error handling */);
    this.ngOnChanges();
  }

  prepareSaveHero(): Venta {
    const formModel = this.compraForm.value;

    // deep copy of form model lairs
    const secretLairsDeepCopy: Vdetalles[] = formModel.detalles.map(
      (address: Vdetalles) => Object.assign({}, this.misdetalles)
    );


    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values

    const saveHero: Venta = {
      fk_sucursal_id: formModel.fk_sucursal_id,
      fk_tab_cliente_id: this._clienteid,
      venta_datos_nro_factura: formModel.venta_datos_nro_factura,
      venta_datos_fecha: formModel.venta_datos_fecha as string,
      fk_forma_pago_id: formModel.fk_forma_pago_id,
      venta_datos_subtotal: this.subtTotales,
      venta_datos_subtotal_cero: this.cartTotalSinIva,
      venta_datos_iva: this.iva,
      venta_datos_total: this.cartTotal,
      detalles: this.misdetalles
    };

    return saveHero;
  }

  revert() { this.ngOnChanges(); }


  getAllProveedores() {
    this._proveedorService.getAllProveedores().subscribe(
      result => {
        this._proveedor = result;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }

  getAllProductos() {
    this._ss.getAllStock().subscribe(
      result => {
        this._producto = result;
        for (var i = 0; i < this._producto.length; i++) {
          var obj = this._producto[i];
          for (var prop in obj) {
            if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
              obj[prop] = +obj[prop];
            }
          }
        }
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }


  doSave() {
    let body = JSON.stringify(this.prepareSaveHero());
    let httpParams = new HttpParams()
      .append("venta", body)


    this.http.post(this.ruta, httpParams)
      .subscribe(
        (data: any) => {
          if (data.data.success == true) {

            this._alert.alertPro(data.data.data.message);
            this._router.navigate(['/ventas/detalles/' + data.data.data.venta_datos_id]);
            this.refreshPage();
          } else {
            this._alert.alertProError(data.data.data.message);
          }
        }
      )
  }


  title = 'angular 4 with jquery';
  toggleTitle() {
    $('.title').slideToggle(); //
    $('#mytable .total_fila').each(function () {

      alert($(this).html());
    });
  }


  getFormaPago() {
    this._formaPagoService.getFormaPago().subscribe(
      result => {
        this._formaPago = result;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }


  getIva() {
    this._is.getAllImpuesto().subscribe(
      (result: any) => {
        this._ivaImpuesto = result;
        this._iva = this._ivaImpuesto[0].tab_impuestos_iva_valor;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }

  getCliente() {
    this._clienteService.getAllClientes().subscribe(
      result => {
        this._cliente = result;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }


  addToCheck(item: Item) {
    if ((item.quantity) <= ((item.stock) - 1)) {
      if (this.ticket.includes(item)) {
        this.ticket[this.ticket.indexOf(item)].quantity += 1;
      } else {
        this.ticket.push(item);
      }
    } else {
      if ((item.quantity) == 1 && (item.stock) != 0) {
        if (this.ticket.includes(item)) {
          this.ticket[this.ticket.indexOf(item)].quantity = 1;
          this._alert.alertProError('No se dispone de stock.');
        } else {
          this.ticket.push(item);
        }
      } else {
        this._alert.alertProError('No se dispone de stock.');
      }
    }







    this.calculateTotal();
  }

  addToClient(item) {
    this._clienteid = item.tab_cliente_id;
    this.clienteci = item.tab_cliente_ruc_ci;
    this.clientename = item.tab_cliente_nombre_empresa;
    this.clientedir = item.tab_cliente_direccion;
  }



  calculateTotal() {
    let total = 0;
    let totalConIva = 0;
    let totalSinIva = 0;
    let cartNum = 0;
    let iva = this._iva;
    let countIva: number = 0.0;
    let sub: number = 0.0;
    var result: any[] = [];
    let descuentoIva: number;
    let descuentoSinIva: number;
    let descuen: number = 0;
    let id = this.id_user.id;
    //
    this.ticket.forEach(function (item: Item) {
      if (item.iva == "SI") {
        totalConIva += (item.precio * item.quantity);
        // descuentoIva += (item.quantity)
        // sub = (totalConIva - (totalConIva * iva));
        // countIva = (totalConIva - sub);
        // cartNum += item.quantity;

        descuentoIva += (item.quantity)
        sub = (totalConIva / (1 + iva - 9));
        countIva =(sub * iva);
        cartNum += item.quantity;


        descuen += (item.quantity * item.precio) - ((item.quantity * item.precio) - ((item.quantity * item.precio) * (item.descuento / 100)))
        if (item) {
          result.push({
            fk_tab_producto_id: item.producto_id,
            venta_detalle_cantidad: item.quantity,
            venta_detalle_valor_unit: item.precio,
            venta_detalle_descuento: item.descuento,
            venta_detalle_total: totalConIva,
            usuario_id: id
          });
        }

      } else {
        totalSinIva += (item.precio * item.quantity);
        cartNum += item.quantity;
        descuen += (item.quantity * item.precio) - ((item.quantity * item.precio) - ((item.quantity * item.precio) * (item.descuento / 100)))

        if (item) {
          result.push({
            fk_tab_producto_id: item.producto_id,
            venta_detalle_cantidad: item.quantity,
            venta_detalle_valor_unit: item.precio,
            venta_detalle_descuento: item.descuento,
            venta_detalle_total: totalSinIva,
            usuario_id: id
          });
        }
      }

    })


    this.misdetalles = result;
    if (this.misdetalles.length > 0) {
      this.postForm = true;
    } else {
      this.postForm = false;
    }

    this.iva = Number(countIva).toFixed(2);
    this.subt = Number(sub).toFixed(2);
    this.descuentito = descuen;
    this.subtTotales = Number(this.subt + totalSinIva).toFixed(2);
    this.cartTotalConIva = totalConIva;
    this.cartTotalSinIva = totalSinIva;

    this.cartTotal = this.cartTotalConIva + this.cartTotalSinIva - descuen;

    this.cartNumItems = cartNum;
    this.ticketSync.updateNumItems(this.cartNumItems);
    this.ticketSync.updateTotal(this.cartTotal);

  }


  syncTicket() {
    this.ticketSync.changeTicket(this.ticket);
  }

  removeItem(item: Item) {
    if (this.ticket.includes(item)) {
      const index = this.ticket.indexOf(item);
      if (index > -1) {
        this.ticket[this.ticket.indexOf(item)].quantity = 1;
        this.ticket.splice(index, 1);
      }
    }
    this.syncTicket();
    this.calculateTotal();
  }

  subtractOne(item: Item) {
    // Check if last item, if so, use remove method
    if (this.ticket[this.ticket.indexOf(item)].quantity === 1) {
      this.removeItem(item);
    } else {
      this.ticket[this.ticket.indexOf(item)].quantity = this.ticket[this.ticket.indexOf(item)].quantity - 1;
    }
    this.syncTicket();
    this.calculateTotal();
  }

  changeDescuento(item: Item, desc: number) {

    // this.ticket[this.ticket.indexOf(item)].quantity += 1;
    this.ticket[this.ticket.indexOf(item)].descuento = desc;//item.descuento.valueOf();



    if (this.ticket.includes(item)) {
      const index = this.ticket.indexOf(item);

      if (index > -1) {

        this.ticket[this.ticket.indexOf(item)].descuento = item.descuento;
      }
    }
    this.syncTicket();
    this.calculateTotal();

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

  getNroFact() {
    this._vs.getCount().subscribe(
      (result: any) => {
        this._countFact = Number(result.compras[0].count_fact_num) + 1;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }

  refreshPage() {
    // window.location.reload();
    setTimeout(function () {
      window.location.reload();
    }, 1500);
  }
}




// export interface Order {
//   orderNumber: string;
//   items?: Item[];
//   cartTotal: number;
//   cartNumItems?: number;
//   venta_detalle_descuento?: number;
// }
