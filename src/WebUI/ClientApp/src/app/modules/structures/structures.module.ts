import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StructuresRoutingModule } from './structures-routing.module';
import { StructuresComponent } from './structures.component';
import { StructuresViewComponent } from './structures-view/structures-view.component';
import {DropdownMenusModule} from "../../_metronic/partials";
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxPaginationModule} from "ngx-pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StructureDetailsComponent } from './structure-details/structure-details.component';
import { OStructureComponent } from './structure-details/o-structure/o-structure.component';
import { ScStructureComponent } from './structure-details/sc-structure/sc-structure.component';
import { GStructureComponent } from './structure-details/g-structure/g-structure.component';
import { PStructureComponent } from './structure-details/p-structure/p-structure.component';
import { AStructureComponent } from './structure-details/a-structure/a-structure.component';
import { CoStructureComponent } from './structure-details/co-structure/co-structure.component';
import { StructureCreateComponent } from './structure-create/structure-create.component';
import {MatSelectModule} from "@angular/material/select";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { StructureUpdateComponent } from './structure-update/structure-update.component';
import {MatSortModule} from "@angular/material/sort";
import {AgGridModule} from "ag-grid-angular";
import {StatutsButtonRenderComponent} from "../statuts/StatutsRenders/statuts-button-render.component";
import {StructureButtonRenderComponent} from "./StructuresRenders/structure-button-render.component";
import {NgApexchartsModule} from "ng-apexcharts";



@NgModule({
  declarations: [
    StructuresComponent,
    StructuresViewComponent,
    StructureDetailsComponent,
    OStructureComponent,
    ScStructureComponent,
    GStructureComponent,
    PStructureComponent,
    AStructureComponent,
    CoStructureComponent,
    StructureCreateComponent,
    StructureUpdateComponent,
    StructureButtonRenderComponent
  ],
    imports: [
        CommonModule,
        StructuresRoutingModule,
        // DropdownMenusModule,
        NgbModule,
        //NgbDropdownModule,
        NgxPaginationModule,
        FormsModule,
        MatSelectModule,
        ReactiveFormsModule,
        NgMultiSelectDropDownModule,
        InlineSVGModule,
        MatSortModule,
        AgGridModule.withComponents([StructureButtonRenderComponent]),
        NgApexchartsModule,
    ]
})
export class StructuresModule { }
