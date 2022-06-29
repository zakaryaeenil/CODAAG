import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EvaluationsViewComponent} from "../evaluations/evaluations-view/evaluations-view.component";
import {EvaluationCreateComponent} from "../evaluations/evaluation-create/evaluation-create.component";
import {EvaluationDetailsComponent} from "../evaluations/evaluation-details/evaluation-details.component";
import {StatutCreateComponent} from "./statut-create/statut-create.component";
import {StatutsViewComponent} from "./statuts-view/statuts-view.component";

const routes: Routes = [

  {
    path: 'all',
    component: StatutsViewComponent,
  },
  {
    path: 'create',
    component: StatutCreateComponent,
  },


  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: '**', redirectTo: 'all', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatutsRoutingModule { }
