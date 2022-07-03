import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EvaluationComponent} from "../evaluations/evaluation.component";
import {ActionViewComponent} from "./action-view/action-view.component";
import {ActionCreateComponent} from "./action-create/action-create.component";
import {ActionUpdateComponent} from "./action-update/action-update.component";

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
      {
        path: 'update/:id',
        component: ActionUpdateComponent,
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
