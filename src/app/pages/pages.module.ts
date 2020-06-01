import { NgModule } from "@angular/core";

import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

//RUTAS
import { PAGES_ROUTES } from './pages.routes';

@NgModule({
  imports: [
    SharedModule,
    PAGES_ROUTES
  ],
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent,
  ]
})

export class PagesModule {}
