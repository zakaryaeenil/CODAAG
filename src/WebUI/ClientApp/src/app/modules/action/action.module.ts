import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionRoutingModule } from './action-routing.module';
import { ActionComponent } from './action.component';
import { ActionCreateComponent } from './action-create/action-create.component';
import { ActionViewComponent } from './action-view/action-view.component';
import {NgxPaginationModule} from "ngx-pagination";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { ActionUpdateComponent } from './action-update/action-update.component';
import {MatSortModule} from "@angular/material/sort";
import {AgGridModule} from "ag-grid-angular";
import {ActionButtonRenderComponent} from "./ActionRenders/action-button-render.component";
import {InlineSVGModule} from "ng-inline-svg-2";


@NgModule({
  declarations: [
    ActionComponent,
    ActionCreateComponent,
    ActionViewComponent,
    ActionUpdateComponent,
    ActionButtonRenderComponent
  ],
    imports: [
        CommonModule,
        ActionRoutingModule,
        NgxPaginationModule,
        NgMultiSelectDropDownModule,
        FormsModule,
        NgbModule,
        MatSortModule,
        AgGridModule.withComponents([ActionButtonRenderComponent]),
        InlineSVGModule
    ]
})
export class ActionModule { }
