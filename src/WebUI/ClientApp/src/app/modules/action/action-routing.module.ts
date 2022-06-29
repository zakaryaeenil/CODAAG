import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EvaluationComponent} from "../evaluations/evaluation.component";
import {EvaluationsViewComponent} from "../evaluations/evaluations-view/evaluations-view.component";
import {EvaluationCreateComponent} from "../evaluations/evaluation-create/evaluation-create.component";
import {EvaluationDetailsComponent} from "../evaluations/evaluation-details/evaluation-details.component";
import {ActionViewComponent} from "./action-view/action-view.component";
import {ActionCreateComponent} from "./action-create/action-create.component";

const routes: Routes = [
  {path: '',
    component: EvaluationComponent,
    children: [
      {
        path: 'all',
        component: ActionViewComponent,
      },
      {
        path: 'create',
        component: ActionCreateComponent,
      },


      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: '**', redirectTo: 'all', pathMatch: 'full' },
    ],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionRoutingModule { }
