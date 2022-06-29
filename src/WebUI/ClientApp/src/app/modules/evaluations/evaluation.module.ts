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
import { EvaluationDetailsComponent } from './evaluation-details/evaluation-details.component';
import { PEvaluationComponent } from './evaluation-details/p-evaluation/p-evaluation.component';
import { AEvaluationComponent } from './evaluation-details/a-evaluation/a-evaluation.component';

@NgModule({
  declarations: [
    EvaluationsViewComponent,
    EvaluationComponent,
    EvaluationCreateComponent,
    EvaluationDetailsComponent,
    PEvaluationComponent,
    AEvaluationComponent,


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
    NgbModule
  ],
  exports: [
    EvaluationsViewComponent
  ],
})
export class EvaluationModule { }
