import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { StarterComponent } from './starter.component';


const routes: Routes = [{
	path: '',
	data: {
		title: 'Dashboard',
		urls: [{ title: 'Dashboard', url: '/' }, { title: 'Dashboard' }]
	},
	component: StarterComponent
}];

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		RouterModule.forChild(routes),
		Ng2SmartTableModule
	],
	declarations: [StarterComponent]
})
export class StarterModule { }