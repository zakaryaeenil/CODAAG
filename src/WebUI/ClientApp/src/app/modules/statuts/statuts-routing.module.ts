import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StatutCreateComponent} from "./statut-create/statut-create.component";
import {StatutsViewComponent} from "./statuts-view/statuts-view.component";
import {StatutUpdateComponent} from "./statut-update/statut-update.component";

const routes: Routes = [

  {
    path: 'all',
    component: StatutsViewComponent,
  },
  {
    path: 'create',
    component: StatutCreateComponent,
  },
  {
    path: 'update/:id',
    component: StatutUpdateComponent,
  },

  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: '**', redirectTo: 'all', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatutsRoutingModule { }
