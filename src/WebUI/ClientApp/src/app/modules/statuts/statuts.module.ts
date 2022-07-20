import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatutsRoutingModule } from './statuts-routing.module';
import { StatutCreateComponent } from './statut-create/statut-create.component';
import { StatutsComponent } from './statuts.component';
import { StatutsViewComponent } from './statuts-view/statuts-view.component';
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {ToastrModule} from "ngx-toastr";
import { StatutUpdateComponent } from './statut-update/statut-update.component';
import {MatSortModule} from "@angular/material/sort";
import {AgGridModule} from "ag-grid-angular";
import {StatutsButtonRenderComponent} from "./StatutsRenders/statuts-button-render.component";
import { StatutDetailsComponent } from './statut-details/statut-details.component';
import { SContratsViewComponent } from './statut-details/s-contrats-view/s-contrats-view.component';
import { SEvaluationsViewComponent } from './statut-details/s-evaluations-view/s-evaluations-view.component';
import { SProjectsViewComponent } from './statut-details/s-projects-view/s-projects-view.component';
import { SActionsViewComponent } from './statut-details/s-actions-view/s-actions-view.component';
import { SOverviewViewComponent } from './statut-details/s-overview-view/s-overview-view.component';
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  declarations: [
    StatutCreateComponent,
    StatutsComponent,
    StatutsViewComponent,
    StatutUpdateComponent,
    StatutsButtonRenderComponent,
    StatutDetailsComponent,
    SContratsViewComponent,
    SEvaluationsViewComponent,
    SProjectsViewComponent,
    SActionsViewComponent,
    SOverviewViewComponent,

  ],
    imports: [
        CommonModule,
        StatutsRoutingModule,
        //  DropdownMenusModule,
        InlineSVGModule,
        //NgApexchartsModule,
        // NgbDropdownModule,
        FormsModule,
        NgxPaginationModule,
        NgbModule,
        ToastrModule,
        MatSortModule,
        AgGridModule.withComponents([StatutsButtonRenderComponent]),
        NgApexchartsModule,
    ]
})
export class StatutsModule { }
