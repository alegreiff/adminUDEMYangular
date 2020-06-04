import { RouterModule, Routes } from "@angular/router";

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginguardGuard } from '../services/guards/loginguard.guard';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginguardGuard ],
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' }},
      { path: 'progress', component: ProgressComponent, data: { titulo: 'Líneas de progreso' }},
      { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas Draw' }},
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
      { path: 'rxjs', component: RxjsComponent , data: { titulo: 'Observables' }},
      { path: 'account-settings', component: AccountSettingsComponent , data: { titulo: 'Ajustes del tema' }},
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  }
]

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
