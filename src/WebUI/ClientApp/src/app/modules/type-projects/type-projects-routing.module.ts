import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TypeProjectsComponent} from "./type-projects.component";
import {TypeProjectsViewComponent} from "./type-projects-view/type-projects-view.component";
import {TypeProjectCreateComponent} from "./type-project-create/type-project-create.component";
import {TypeProjectUpdateComponent} from "./type-project-update/type-project-update.component";
import {TypeProjectDetailsComponent} from "./type-project-details/type-project-details.component";

const routes: Routes = [
  {path: '',
    component: TypeProjectsComponent,
    children: [
      {
        path: 'all',
        component: TypeProjectsViewComponent,
      },
      {
        path: 'create',
        component: TypeProjectCreateComponent,
      },
      {
        path: 'update/:id',
        component: TypeProjectUpdateComponent,
      },
      {
        path: 'details/:id',
        component: TypeProjectDetailsComponent,
      },

      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: '**', redirectTo: 'all', pathMatch: 'full' },
    ],}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeProjectsRoutingModule { }
