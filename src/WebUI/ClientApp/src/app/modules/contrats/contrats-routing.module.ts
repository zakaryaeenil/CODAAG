import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ContratCreateComponent} from "./contrat-create/contrat-create.component";
import {ContratViewComponent} from "./contrat-view/contrat-view.component";
import {ContratUpdateComponent} from "./contrat-update/contrat-update.component";

const routes: Routes = [
  {
    path: 'all',
    component: ContratViewComponent,
  },
  {
    path: 'create',
    component: ContratCreateComponent,
  },
  {
    path: 'update/:id',
    component: ContratUpdateComponent,
  },

  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: '**', redirectTo: 'all', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratsRoutingModule { }
