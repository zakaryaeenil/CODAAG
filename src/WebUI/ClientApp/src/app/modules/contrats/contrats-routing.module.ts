import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EvaluationsViewComponent} from "../evaluations/evaluations-view/evaluations-view.component";
import {EvaluationCreateComponent} from "../evaluations/evaluation-create/evaluation-create.component";
import {EvaluationDetailsComponent} from "../evaluations/evaluation-details/evaluation-details.component";
import {ContratCreateComponent} from "./contrat-create/contrat-create.component";
import {ContratViewComponent} from "./contrat-view/contrat-view.component";

const routes: Routes = [
  {
    path: 'all',
    component: ContratViewComponent,
  },
  {
    path: 'create',
    component: ContratCreateComponent,
  },

  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: '**', redirectTo: 'all', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratsRoutingModule { }
