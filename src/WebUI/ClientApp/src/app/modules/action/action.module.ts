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


@NgModule({
  declarations: [
    ActionComponent,
    ActionCreateComponent,
    ActionViewComponent
  ],
    imports: [
        CommonModule,
        ActionRoutingModule,
        NgxPaginationModule,
        NgMultiSelectDropDownModule,
        FormsModule,
        NgbModule
    ]
})
export class ActionModule { }
