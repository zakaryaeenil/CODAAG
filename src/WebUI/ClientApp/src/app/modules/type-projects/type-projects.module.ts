import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeProjectsRoutingModule } from './type-projects-routing.module';
import { TypeProjectsViewComponent } from './type-projects-view/type-projects-view.component';
import {TypeProjectsComponent} from "./type-projects.component";
import {DropdownMenusModule} from "../../_metronic/partials";
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgbDatepickerModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule} from "@angular/forms";
import { TypeProjectCreateComponent } from './type-project-create/type-project-create.component';
import { TypeProjectUpdateComponent } from './type-project-update/type-project-update.component';
import {MatSortModule} from "@angular/material/sort";
import {AgGridModule} from "ag-grid-angular";
import {ButtonRendererComponent} from "./renders/button-renderer.component";
import { TypeProjectDetailsComponent } from './type-project-details/type-project-details.component';
import { TpOverviewViewComponent } from './type-project-details/tp-overview-view/tp-overview-view.component';
import { TpProjectsComponent } from './type-project-details/tp-projects/tp-projects.component';


@NgModule({
  declarations: [
    TypeProjectsViewComponent,
    TypeProjectsComponent,
    TypeProjectCreateComponent,
    TypeProjectUpdateComponent,
    ButtonRendererComponent,
    TypeProjectDetailsComponent,
    TpOverviewViewComponent,
    TpProjectsComponent,

  ],
    imports: [
        CommonModule,
        TypeProjectsRoutingModule,
        DropdownMenusModule,
        InlineSVGModule,
        NgApexchartsModule,
        NgbDropdownModule,
        FormsModule,
        NgxPaginationModule,
        NgbDatepickerModule,
        MatSortModule,
        AgGridModule.withComponents([ButtonRendererComponent])
    ]
})
export class TypeProjectsModule { }
