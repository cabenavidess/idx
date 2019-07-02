import { Component, AfterViewInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { CiudadService } from '../../services/ciudad.service';
import { CategoriaService } from '../../services/categoria.service';
import { MarcaService } from '../../services/marca.service';
import { ProductoService } from '../../services/producto.service';
import { ProveedorService } from '../../services/proveedor.service';
import { RepresentanteNegocio } from '../../models/representante';
import { RepresentantenegocioService } from '../../services/representantenegocio.service';
import { SucursalService } from '../../services/sucursal.service';
import { ImpuestoService } from '../../services/impuesto.service';
import { VentasService } from '../../services/ventas.service';
import { ExcelService } from '../../services/excel.service';
import { UserService } from '../../services/user.service';
@Component({
	templateUrl: './starter.component.html'
})
export class StarterComponent implements AfterViewInit {

	subtitle: string;
	clientes;
	countCliente: number = 0;
	ciudades;
	countCiudad: number = 0;
	categoria;
	countCategoria: number = 0;
	marca;
	countMarca: number = 0;
	producto;
	countProducto: number = 0;
	proveedor;
	countProveedor: number = 0;
	representante;
	countRepresentante: number = 0;
	sucursal;
	countSucursal: number = 0;
	impuesto;
	countImpuesto: number = 0;
	countVdiaria;
	countVdiarias: number = 0;
	countCVdiaria;
	countCVdiarias: number = 0;


	countCCdiaria;
	countCCdiarias: number = 0;



	settings = {
		actions: false,
		attr: {
			class: 'table table-bordered table-hover',
		},
		columns: {
			mes: {
				title: 'Fecha',
			},
			efectivo: {
				title: 'Efectivo',
			},
			tarjetas: {
				title: 'Tarjetas',
			},
			dinero_elec: {
				title: 'Dinero Electrónico',
			},
			otros: {
				title: 'Otros',
			},
			total: {
				title: 'Total',
				type: "html",
				filter: true,
				valuePrepareFunction: (value) => {
					return value === 'Total' ? value : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
				}
			},
		}
	};
	data;


	constructor(
		private _vs: VentasService,
		private _cs: ClienteService,
		private _cis: UserService,
		private _categor: CategoriaService,
		private _dmarca: MarcaService,
		private _dproducto: ProductoService,
		private _dproveedor: ProveedorService,
		private _drepresentante: RepresentantenegocioService,
		private _dsucursal: SucursalService,
		private _dimpuesto: ImpuestoService,
		private _es: ExcelService
	) {
		this.subtitle = "This is some text within a card block."
		this.countClientes();
		this.countCiudades();
		this.countCategorias();
		this.countMarcas();
		this.countProductos();
		this.countProveedores();
		this.countRepresentantes();
		this.countImpuestos();
		this.getData();
		this.countVD();
		this.countCD();
		this.countCVD();
		this.countCCD();
	}

	ngAfterViewInit() { }

	countClientes() {
		this._cs.getAllClientes()
			.subscribe(result => {
				this.clientes = result;

				for (var i = 0; i < this.clientes.length; i++) {
					this.countCliente += 1;
				}

			});
	}

	countCiudades() {
		this._cis.getAllUsersAdmin()
			.subscribe(result => {
				this.ciudades = result;
				for (var i = 0; i < this.ciudades.length; i++) {
					this.countCiudad += 1;
				}

			});
	}



	countCategorias() {
		this._categor.getAllCategorias()
			.subscribe(result => {
				this.categoria = result;
				for (var i = 0; i < this.categoria.length; i++) {
					this.countCategoria += 1;
				}

			});
	}

	countMarcas() {
		this._dmarca.getAllMarcas()
			.subscribe(result => {
				this.marca = result;
				for (var i = 0; i < this.marca.length; i++) {
					this.countMarca += 1;
				}

			});
	}


	countProveedores() {
		this._dproveedor.getAllProveedores()
			.subscribe(result => {
				this.proveedor = result;
				for (var i = 0; i < this.proveedor.length; i++) {
					this.countProveedor += 1;
				}

			});
	}


	countProductos() {
		this._dproducto.getAllProductos()
			.subscribe(result => {
				this.producto = result;
				
				for (var i = 0; i < this.producto.length; i++) {
					this.countProducto += 1;
				}

			});
	}

	countRepresentantes() {
		this._drepresentante.getAllRepresentantenegocios()
			.subscribe(result => {
				this.representante = result;
				for (var i = 0; i < this.representante.length; i++) {
					this.countRepresentante += 1;
				}

			});
	}


	countImpuestos() {
		this._dimpuesto.getAllImpuesto()
			.subscribe(result => {
				this.impuesto = result;
				for (var i = 0; i < this.impuesto.length; i++) {
					this.countImpuesto += 1;
				}

			});
	}


	getData() {
		this._vs.getRecaudacionesDiarias()
			.subscribe((result: any) => {
				this.data = result.ventas;
			})
	}

	export() {
		this._es.exportAsExcelFile(this.data, 'recaudado');
	}


	countVD() {
		this._vs.getRecaudacionesCountDiarias()
			.subscribe((result: any) => {
				this.countVdiaria = result.ventas[0].total;
			});
	}


	countCD() {
		this._vs.getComprasCountDiarias()
			.subscribe((result: any) => {
				this.countCCdiaria = result.ventas[0].total;
			});
	}


	countCVD() {
		this._vs.getComprasCountDiarias()
			.subscribe((result: any) => {
				this.countCCdiarias = result.ventas[0].total;
			});
	}


	countCCD() {
		this._vs.getComprasCountDiarias()
			.subscribe((result: any) => {
				this.countCCdiaria = result.ventas[0].total;
			});
	}
}