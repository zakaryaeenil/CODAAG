import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EvaluationComponent} from "./evaluation.component";
import {EvaluationsViewComponent} from "./evaluations-view/evaluations-view.component";
import {EvaluationCreateComponent} from "./evaluation-create/evaluation-create.component";

import {EvaluationUpdateComponent} from "./evaluation-update/evaluation-update.component";

const routes: Routes = [
  {path: '',
  component: EvaluationComponent,
  children: [
  {
    path: 'all',
    component: EvaluationsViewComponent,
  },
    {
      path: 'create',
      component: EvaluationCreateComponent,
    },
    {
      path: 'update/:id',
      component: EvaluationUpdateComponent,
    },

  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: '**', redirectTo: 'all', pathMatch: 'full' },
],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationRoutingModule { }
