import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SucursalService } from '../../services/sucursal.service';
import { ProveedorService } from '../../services/proveedor.service';
import { ProductoService } from '../../services/producto.service';
import { HeadersService } from '../../services/headers.service';

import { Hero, states } from '../compras/data-model';
import { HeroService } from './hero.service';
import { Detalles } from '../../models/detalles';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { ItemProd } from '../../models/item-prod';
import { PosService } from '../../services/pos.service';
import { PosService1 } from '../../services/pos.service1';
import { ImpuestoService } from '../../services/impuesto.service';
import { ExcelService } from '../../services/excel.service';
import { Location } from '@angular/common';
import { GlobalService } from '../../services/global.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: [],

})
export class ComprasComponent implements OnChanges {

  @Input() hero: Hero;

  compraForm: FormGroup;
  states = states;
  _proveedor;
  _producto;
  _producto2 = [];
  compra;
  detalle_compra_cantidad = 1;
  detalle_compra_valor_unit = 0;
  detalle_compra_valor_total = 0;
  detalle_compra_ganancia = 0;
  detalle_compra_iva = false;
  detalle_compra_costo = 0;
  var = 0;
  ivaSi;
  vu;
  cant;
  indice;
  cambioValorIva;
  fechaActual = new Date();;
  ruta: string;
  private errorMessage: any;
  cantidad;
  public items: Array<any> = [];
  cars;
  prov;
  termClient;
  term;

  _proveedorid;
  proveedorci;
  prooveedorname;
  prooveedoremail

  ticket: ItemProd[];
  cartTotal = 0;
  cartNumItems = 0;
  misdetalles;
  _iva;
  _ivaImpuesto;
  _costo;
  user_data;
  id_user;
  postForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private heroService: HeroService,
    private _sucursalService: SucursalService,
    private _proveedorService: ProveedorService,
    private _productoService: ProductoService,
    private http: HttpClient,
    private _headers: HeadersService,
    private _alert: AlertService,
    private _router: Router,
    private ticketSync: PosService1,
    private _is: ImpuestoService,
    private _es: ExcelService,
    private location: Location,
    private _gs: GlobalService
  ) {

    this.ruta = this._gs.urlGlobalService + '/compras/guardafact'
    this.createForm();
    this.getAllProveedores();
    this.getAllProductos();
    this.getIva();

    this.ticketSync.currentTicket.subscribe(data => this.ticket = data);
    this.ticketSync.currentTotal.subscribe(total => this.cartTotal = total);
    this.ticketSync.currentCartNum.subscribe(num => this.cartNumItems);

    this.user_data = localStorage.getItem("user-data");
    this.id_user = JSON.parse(this.user_data)
  }

  createForm() {
    this.compraForm = this.fb.group({
      datos_compra_guia: 0,
      datos_compra_iva: 0,
      datos_compra_subtotal: 0,
      fecha: '',
      fk_tab_proveedor_mercaderia_id: 0,
      datos_compra_total: 0,
      detalles: this.fb.array([])
    });
  }

  ngOnChanges() {
    this.setAddresses(this.hero.detalles);

  }

  get detalles(): FormArray {
    return this.compraForm.get('detalles') as FormArray;
  };

  setAddresses(addresses: Detalles[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.compraForm.setControl('detalles', addressFormArray);
  }

  addLair() {
    this.detalles.push(this.fb.group(new Detalles()));
  }

  removeLair() {
    this.detalles.removeAt(1);
  }

  onSubmit() {
    this.hero = this.prepareSaveHero();


    this.heroService.saveHero(this.hero).subscribe(/* error handling */);
    this.ngOnChanges();
  }

  prepareSaveHero(): Hero {
    const formModel = this.compraForm.value;

    // deep copy of form model lairs
    const secretLairsDeepCopy: Detalles[] = formModel.detalles.map(
      (address: Detalles) => Object.assign({}, this.misdetalles)
    );

    const saveHero: Hero = {
      datos_compra_guia: formModel.datos_compra_guia,
      datos_compra_iva: formModel.datos_compra_iva,
      datos_compra_subtotal: formModel.datos_compra_subtotal,
      fecha: formModel.fecha as string,
      fk_tab_proveedor_mercaderia_id: this._proveedorid,
      datos_compra_total: formModel.datos_compra_total,
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
    this._productoService.getAllProductosPrecio().subscribe(
      (result: any) => {
        this._producto = result;

        for (var i = 0; i < this._producto.length; i++) {
          var obj = this._producto[i];
          for (var prop in obj) {
            if (obj.hasOwnProperty(prop) && obj[prop] !== null && !isNaN(obj[prop])) {
              obj[prop] = +obj[prop];
            }
          }
        }


        for (let i of result) {
          this.items.push(i.tab_producto_codigo);
        }


      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }

  getAllProductosS() {
    this._productoService.getAllProductosSelect().subscribe(
      (result: any) => {
        this._producto2 = result;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
      }
    );
  }

  total(total, detalle_compra_cantidad, detalle_compra_valor_unit) {
    this.detalle_compra_valor_total = detalle_compra_cantidad * detalle_compra_valor_unit;

    let sum = 0;

    for (let i = 0; i < this.detalles.length; i++) {
      sum += parseFloat(this.detalles[i].detalle_compra_valor_total);
    }

  }

  doSave() {
    let body = JSON.stringify(this.prepareSaveHero());
    let httpParams = new HttpParams()
      .append("compra", body)

    let data = JSON.stringify(httpParams);
    let headers = this._headers.getHeaders();

    this.http.post(this.ruta, httpParams)
      .subscribe(
        (data: any) => {
          if (data.data.success == true) {
            // this.refreshPage();
            this._alert.alertPro(data.data.data.message);
            this._router.navigate(['/compras/detalles/' + data.data.data.datos_compra_id]);
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


  calcularIva(value, idx) {
    this.indice = idx;
    if (!value) {
      this.cambioValorIva = value;

    } else {
      this.cambioValorIva = value;
    }
  }

  addToClient(item) {

    this._proveedorid = item.tab_proveedor_mercaderia_id;
    this.proveedorci = item.tab_proveedor_mercaderia_ruc;
    this.prooveedorname = item.tab_proveedor_mercaderia_empresa;
    this.prooveedoremail = item.tab_proveedor_mercaderia_email;
  }

  addToCheck(item) {
    if (this.ticket.includes(item)) {
      this.ticket[this.ticket.indexOf(item)].quantity += 1;
    } else {
      this.ticket.push(item);
    }
    // 
    
    this.syncTicket();
    // this.calculateTotal();
    // console.log(this.ticket);
    // console.log('detalles',this.ticket);
    
  }

  calculos(){

    let cartNum = 0;
    var result: any[] = [];
    let id = this.id_user.id;

    this.ticket.forEach(function (item: ItemProd) {
      if (item.iva == "CON IVA") {
        if (item) {
          result.push({
            detalle_compra_cantidad: item.quantity,
            detalle_compra_valor_unit: item.precio,
            detalle_compra_valor_total: item.valor_venta_total,
            fk_tap_producto_id: item.tab_producto_id,
            detalle_compra_valor_venta: item.valor_venta,
            detalle_compra_iva: 1,
            detalle_compra_ganancia: item.utility,
            detalle_compra_costo: item.cant,
            usuario_id: id
          });
        }
      } else {
        if (item) {
          result.push({
            detalle_compra_cantidad: item.quantity,
            detalle_compra_valor_unit: item.precio,
            detalle_compra_valor_total: item.valor_venta_total,
            fk_tap_producto_id: item.tab_producto_id,
            detalle_compra_valor_venta: item.valor_venta,
            detalle_compra_iva: 0,
            detalle_compra_ganancia: item.utility,
            detalle_compra_costo: item.precio,
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

    this.cartNumItems = cartNum;
    this.ticketSync.updateNumItems(this.cartNumItems);
    this.ticketSync.updateTotal(this.cartTotal);
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
    let costoc: number = 0;
    let costocround: number = 0;
    let vv: number = 0;
    let vvr: number = 0;
    let vvt: number = 0;
    let vvtr: number = 0;
    let vv0: number = 0;
    let vvr0: number = 0;
    let vvt0: number = 0;
    let vvtr0: number = 0;

    this.ticket.forEach(function (item: ItemProd) {
      if (item.iva == "CON IVA") {
        totalConIva += (item.precio * item.quantity);
        descuentoIva += (item.quantity)
        sub = (totalConIva - (totalConIva * iva));
        countIva = (totalConIva - sub);
        cartNum += item.quantity;
        descuen += (item.quantity * item.precio) - ((item.quantity * item.precio) - ((item.quantity * item.precio) * (item.descuento / 100)));
        costoc += (item.precio * iva) + item.precio;
        costocround = Math.round(costoc * Math.pow(10, 4)) / Math.pow(10, 4);
        item.cant = costocround;
        vv += (((item.precio * iva) + item.precio) * item.utility) / 100;
        vvr = Math.round(vv * Math.pow(10, 2)) / Math.pow(10, 2);
        item.valor_venta = vvr;
        vvt += item.quantity * costocround;
        vvtr = Math.round(vvt * Math.pow(10, 2)) / Math.pow(10, 2);
        item.valor_venta_total = vvtr;
       
        if (item) {
          result.push({
            detalle_compra_cantidad: item.quantity,
            detalle_compra_valor_unit: item.precio,
            detalle_compra_valor_total: vvt,
            fk_tap_producto_id: item.tab_producto_id,
            detalle_compra_valor_venta: vvr,
            detalle_compra_iva: 1,
            detalle_compra_ganancia: item.utility,
            detalle_compra_costo: costoc,
            usuario_id: id
          });
        }
        // this.syncTicket();

      } else {
        totalSinIva += (item.precio * item.quantity);
        cartNum += item.quantity;
        descuen += (item.quantity * item.precio) - ((item.quantity * item.precio) - ((item.quantity * item.precio) * (item.descuento / 100)))
        item.cant = item.precio;

        // (($index['detalle_compra_valor_unit']) * $index['detalle_compra_ganancia']) / 100;
        vv0 += (item.precio * item.utility) / 100;
        vvr0 = Math.round(vv0 * Math.pow(10, 2)) / Math.pow(10, 2);
        item.valor_venta = vvr0;

        // $index['detalle_compra_cantidad'] * ( $index['detalle_compra_valor_unit']);
        vvt0 += item.quantity * item.precio;
        vvtr0 = Math.round(vvt0 * Math.pow(10, 2)) / Math.pow(10, 2);
        item.valor_venta_total = vvtr0;
    
        if (item) {
          result.push({
            detalle_compra_cantidad: item.quantity,
            detalle_compra_valor_unit: item.precio,
            detalle_compra_valor_total: item.valor_venta_total,
            fk_tap_producto_id: item.tab_producto_id,
            detalle_compra_valor_venta: item.valor_venta,
            detalle_compra_iva: 0,
            detalle_compra_ganancia: item.utility,
            detalle_compra_costo: item.precio,
            usuario_id: id
          });
        }
        // 
      }

    })
    console.log('detalles',this.ticket);
    console.log('result',result);
    

    this.misdetalles = result;
    if (this.misdetalles.length > 0) {
      this.postForm = true;
    } else {
      this.postForm = false;
    }

    this.cartNumItems = cartNum;
    this.ticketSync.updateNumItems(this.cartNumItems);
    this.ticketSync.updateTotal(this.cartTotal);

  }


  syncTicket() {
    this.ticketSync.changeTicket(this.ticket);
  }


  changeCant(item: ItemProd, desc: number) {
    this.syncTicket();
    this.calculateTotal();

  }

  removeItem(item: ItemProd) {
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

  subtractOne(item: ItemProd) {
    // Check if last item, if so, use remove method
    if (this.ticket[this.ticket.indexOf(item)].quantity === 1) {
      this.removeItem(item);
    } else {
      this.ticket[this.ticket.indexOf(item)].quantity = this.ticket[this.ticket.indexOf(item)].quantity - 1;
    }
    this.syncTicket();
    this.calculateTotal();
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

  changePrecioU(item: ItemProd, pu: number, ut: number) {
    console.log('precios');
    
    
    this.ticket[this.ticket.indexOf(item)].precio = pu;
    this.ticket[this.ticket.indexOf(item)].utility = ut;
    let costocround: number = 0;
    let costoc: number = 0;
    let valorround: number = 0;
    let valorv: number = 0;
    let valortotalround: number = 0;
    let valortotal: number = 0;

    if (this.ticket.includes(item)) {
      const index = this.ticket.indexOf(item);

      if (index > -1) {


        if (this.ticket[this.ticket.indexOf(item)].iva == "CON IVA") {
          this.ticket[this.ticket.indexOf(item)].precio = item.precio;

          costoc = (item.precio * this._iva) + (item.precio);
          costocround = Math.round(costoc * Math.pow(10, 4)) / Math.pow(10, 4);
          this.ticket[this.ticket.indexOf(item)].cant = costocround;


          // ((($index['detalle_compra_valor_unit'] * 0.12) + $index['detalle_compra_valor_unit']) * $index['detalle_compra_ganancia']) / 100;
          valorv = (((item.precio * this._iva) + item.precio) * item.utility) / 100;
          valorround = Math.round(valorv * Math.pow(10, 2)) / Math.pow(10, 2);
          this.ticket[this.ticket.indexOf(item)].valor_venta = valorround;

          // $index['detalle_compra_cantidad'] * (($index['detalle_compra_valor_unit'] * 0.12) + $index['detalle_compra_valor_unit']);
          valortotal = item.quantity * costocround;
          valortotalround = Math.round(valortotal * Math.pow(10, 2)) / Math.pow(10, 2);
          this.ticket[this.ticket.indexOf(item)].valor_venta_total = valortotalround;

        } else {
          this.ticket[this.ticket.indexOf(item)].precio = item.precio;
          this.ticket[this.ticket.indexOf(item)].cant = (item.precio);
          this.ticket[this.ticket.indexOf(item)].valor_venta_total = (item.precio * this._iva) + (item.precio);

          // (($index['detalle_compra_valor_unit']) * $index['detalle_compra_ganancia']) / 100;
          valorv = (item.precio * item.utility) / 100;
          valorround = Math.round(valorv * Math.pow(10, 2)) / Math.pow(10, 2);
          this.ticket[this.ticket.indexOf(item)].valor_venta = valorround;

          // $index['detalle_compra_cantidad'] * ( $index['detalle_compra_valor_unit']);
          valortotal = item.quantity * item.precio;
          valortotalround = Math.round(valortotal * Math.pow(10, 2)) / Math.pow(10, 2);
          this.ticket[this.ticket.indexOf(item)].valor_venta_total = valortotalround;


        }
        //this.ticket.splice(index, 1);
      }
    }
    this.syncTicket();

  }

  export() {
    this._es.exportAsExcelFile(this._producto, 'stock');
  }

  refreshPage() {
    // window.location.reload();
    setTimeout(function () {
      window.location.reload();
    }, 1500);
  }
}
