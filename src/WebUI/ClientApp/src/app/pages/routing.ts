import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'builder',
    loadChildren: () =>
      import('./builder/builder.module').then((m) => m.BuilderModule),
  },
  {
    path: 'crafted/pages/profile',
    loadChildren: () =>
      import('../modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  {
    path: 'crafted/account',
    loadChildren: () =>
      import('../modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'crafted/pages/wizards',
    loadChildren: () =>
      import('../modules/wizards/wizards.module').then((m) => m.WizardsModule),
  },
  {
    path: 'crafted/widgets',
    loadChildren: () =>
      import('../modules/widgets-examples/widgets-examples.module').then(
        (m) => m.WidgetsExamplesModule
      ),
  },
  {
    path: 'apps/chat',
    loadChildren: () =>
      import('../modules/apps/chat/chat.module').then((m) => m.ChatModule),
  },

  {
  path: 'evaluations',
  loadChildren: () =>
  import('../modules/evaluations/evaluation.module').then((m) => m.EvaluationModule),
  },


  //
  {
    path: 'structures',
    loadChildren: () =>
      import('../modules/structures/structures.module').then((m) => m.StructuresModule),
  },
  {
    path: 'actions',
    loadChildren: () =>
      import('../modules/action/action.module').then((m) => m.ActionModule),
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('../modules/projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'contrats',
    loadChildren: () =>
      import('../modules/contrats/contrats.module').then((m) => m.ContratsModule),
  },
  {
    path: 'typesproject',
    loadChildren: () =>
      import('../modules/type-projects/type-projects.module').then((m) => m.TypeProjectsModule),
  },
  {
    path: 'statuts',
    loadChildren: () =>
      import('../modules/statuts/statuts.module').then((m) => m.StatutsModule),
  },
  //
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
