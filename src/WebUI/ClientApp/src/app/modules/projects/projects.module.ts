import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectsViewComponent } from './projects-view/projects-view.component';
import {DropdownMenusModule,} from "../../_metronic/partials";
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProjectCreateComponent } from './project-create/project-create.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {MatSelectModule} from "@angular/material/select";
import { ProjectUpdateComponent } from './project-update/project-update.component';
import {MatSortModule} from "@angular/material/sort";
import {AgGridModule} from "ag-grid-angular";
import {ProjectButtonRenderComponent} from "./ProjectRenders/project-button-render.component";
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { POverViewViewComponent } from './project-details/p-over-view-view/p-over-view-view.component';
import { PContratComponent } from './project-details/p-contrat/p-contrat.component';
import { PActionComponent } from './project-details/p-action/p-action.component';
import { PStructureComponent } from './project-details/p-structure/p-structure.component';
import { PEvaluationComponent } from './project-details/p-evaluation/p-evaluation.component';
import { EvalProjectComponent } from './eval-project/eval-project.component';
import {ProjectNumericEditor} from "./ProjectRenders/project-numeric-editor";



@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsViewComponent,
    ProjectCreateComponent,
    ProjectUpdateComponent,
    ProjectButtonRenderComponent,
    ProjectDetailsComponent,
    POverViewViewComponent,
    PContratComponent,
    PActionComponent,
    PStructureComponent,
    PEvaluationComponent,
    EvalProjectComponent,
    ProjectNumericEditor
  ],
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        // DropdownMenusModule,
        NgbModule,
        // NgbDropdownModule,
        NgxPaginationModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        NgMultiSelectDropDownModule,
        InlineSVGModule,
        MatSortModule,
        AgGridModule.withComponents([ProjectButtonRenderComponent,ProjectNumericEditor]),
        NgApexchartsModule,
    ]
})
export class ProjectsModule { }
