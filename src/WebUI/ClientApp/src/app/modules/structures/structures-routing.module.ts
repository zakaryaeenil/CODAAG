import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {StructuresComponent} from "./structures.component";
import {StructuresViewComponent} from "./structures-view/structures-view.component";
import {StructureDetailsComponent} from "./structure-details/structure-details.component";
import {StructureCreateComponent} from "./structure-create/structure-create.component";
import {StructureUpdateComponent} from "./structure-update/structure-update.component";

const routes: Routes = [
  {path: '',
    component: StructuresComponent,
    children: [
      {
        path: 'all',
        component: StructuresViewComponent,
      },
      {
        path: ':id/details',
        component: StructureDetailsComponent,
      },
      {
        path: 'create',
        component: StructureCreateComponent,
      },
      {
        path: 'update/:id',
        component: StructureUpdateComponent,
      },

      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: '**', redirectTo: 'all', pathMatch: 'full' },
    ],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StructuresRoutingModule { }
