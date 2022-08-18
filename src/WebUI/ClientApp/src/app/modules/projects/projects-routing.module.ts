import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EvaluationComponent} from "../evaluations/evaluation.component";
import {EvaluationsViewComponent} from "../evaluations/evaluations-view/evaluations-view.component";
import {ProjectsComponent} from "./projects.component";
import {ProjectsViewComponent} from "./projects-view/projects-view.component";
import {ProjectCreateComponent} from "./project-create/project-create.component";
import {ProjectUpdateComponent} from "./project-update/project-update.component";
import {EvaluationDetailsComponent} from "../evaluations/evaluation-details/evaluation-details.component";
import {ProjectDetailsComponent} from "./project-details/project-details.component";
import {EvalProjectComponent} from "./eval-project/eval-project.component";

const routes: Routes = [
  {path: '',
    component: ProjectsComponent,
    children: [
      {
        path: 'all',
        component: ProjectsViewComponent,
      },
      {
        path: 'create',
        component: ProjectCreateComponent,
      },
      {
        path: 'evaluation',
        component: EvalProjectComponent,
      },
      {
        path: 'update/:id',
        component: ProjectUpdateComponent,
      },
      {
        path: 'details/:id',
        component: ProjectDetailsComponent,
      },

      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: '**', redirectTo: 'all', pathMatch: 'full' },
    ],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
