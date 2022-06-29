import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratsRoutingModule } from './contrats-routing.module';
import { ContratsComponent } from './contrats.component';
import { ContratCreateComponent } from './contrat-create/contrat-create.component';
import {ContratViewComponent} from "./contrat-view/contrat-view.component";
import {DropdownMenusModule} from "../../_metronic/partials";
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    ContratsComponent,
    ContratCreateComponent,
    ContratViewComponent
  ],
  imports: [
    CommonModule,
    ContratsRoutingModule,
    DropdownMenusModule,
    InlineSVGModule,
    NgApexchartsModule,
    NgbDropdownModule,
    FormsModule,
    NgxPaginationModule,
    NgbModule
  ]
})
export class ContratsModule { }
