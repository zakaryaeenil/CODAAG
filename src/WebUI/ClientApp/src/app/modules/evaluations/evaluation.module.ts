import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluationRoutingModule } from './evaluation-routing.module';
import { EvaluationsViewComponent } from './evaluations-view/evaluations-view.component';
import { EvaluationComponent } from './evaluation.component';
import {DropdownMenusModule} from "../../_metronic/partials";
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import { EvaluationCreateComponent } from './evaluation-create/evaluation-create.component';
import { EvaluationUpdateComponent } from './evaluation-update/evaluation-update.component';
import {MatSortModule} from "@angular/material/sort";
import {AgGridModule} from "ag-grid-angular";
import {EvaluationButtonRenderComponent} from "./EvaluationRenders/evaluation-button-render.component";
import { EvaluationDetailsComponent } from './evaluation-details/evaluation-details.component';
import { EProjectsComponent } from './evaluation-details/e-projects/e-projects.component';
import { EActionsComponent } from './evaluation-details/e-actions/e-actions.component';
import { EOverViewViewComponent } from './evaluation-details/e-over-view-view/e-over-view-view.component';

@NgModule({
  declarations: [
    EvaluationsViewComponent,
    EvaluationComponent,
    EvaluationCreateComponent,
    EvaluationUpdateComponent,
    EvaluationButtonRenderComponent,
    EvaluationDetailsComponent,
    EProjectsComponent,
    EActionsComponent,
    EOverViewViewComponent

  ],
    imports: [
        CommonModule,
        EvaluationRoutingModule,
        DropdownMenusModule,
        InlineSVGModule,
        NgApexchartsModule,
        NgbDropdownModule,
        FormsModule,
        NgxPaginationModule,
        NgbModule,
        MatSortModule,
        AgGridModule.withComponents([EvaluationButtonRenderComponent])
    ],
  exports: [
    EvaluationsViewComponent
  ],
})
export class EvaluationModule { }
