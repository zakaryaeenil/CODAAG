import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatutsRoutingModule } from './statuts-routing.module';
import { StatutCreateComponent } from './statut-create/statut-create.component';
import { StatutsComponent } from './statuts.component';
import { StatutsViewComponent } from './statuts-view/statuts-view.component';
import {DropdownMenusModule} from "../../_metronic/partials";
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {ToastrModule} from "ngx-toastr";
import {AccountModule} from "../account/account.module";


@NgModule({
  declarations: [
    StatutCreateComponent,
    StatutsComponent,
    StatutsViewComponent
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
       // AccountModule
    ]
})
export class StatutsModule { }
