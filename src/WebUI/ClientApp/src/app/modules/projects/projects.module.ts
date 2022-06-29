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



@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsViewComponent,
    ProjectCreateComponent,

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
  ]
})
export class ProjectsModule { }
