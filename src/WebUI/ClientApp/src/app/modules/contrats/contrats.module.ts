import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratsRoutingModule } from './contrats-routing.module';
import { ContratsComponent } from './contrats.component';
import { ContratCreateComponent } from './contrat-create/contrat-create.component';
import {ContratViewComponent} from "./contrat-view/contrat-view.component";
import {CardsModule, DropdownMenusModule} from "../../_metronic/partials";
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import { ContratUpdateComponent } from './contrat-update/contrat-update.component';
import {MatSortModule} from "@angular/material/sort";
import {AgGridModule} from "ag-grid-angular";
import {ContratButtonRenderComponent} from "./ContratRenders/contrat-button-render.component";
import { ContratDetailsComponent } from './contrat-details/contrat-details.component';
import { CoProjectsComponent } from './contrat-details/co-projects/co-projects.component';
import { CoActionsComponent } from './contrat-details/co-actions/co-actions.component';
import { CoOverViewComponent } from './contrat-details/co-over-view/co-over-view.component';


@NgModule({
  declarations: [
    ContratsComponent,
    ContratCreateComponent,
    ContratViewComponent,
    ContratUpdateComponent,
    ContratButtonRenderComponent,
    ContratDetailsComponent,
    CoProjectsComponent,
    CoActionsComponent,
    CoOverViewComponent
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
        NgbModule,
        MatSortModule,
        AgGridModule.withComponents([ContratButtonRenderComponent]),
        CardsModule
    ]
})
export class ContratsModule { }
