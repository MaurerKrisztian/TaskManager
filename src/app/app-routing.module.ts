import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimelinetasksComponent } from './timelinetasks/timelinetasks.component';
import { LogsComponent } from './logs/logs.component';
import { NotfoundComponent } from './elements/notfound/notfound.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  { path: 'taskboards', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'timeline', component: TimelinetasksComponent },
  { path: '', component: TimelinetasksComponent },
  { path: 'logs', component: LogsComponent },
  { path: '404', component: NotfoundComponent },
  { path: 'soon', component: ComingSoonComponent },
  { path: 'chart', component: ChartsComponent },
  {
    path: '**',
    component: NotfoundComponent,
    data: { pageLabel: 'notFound', cxPath: 'pageNotFound' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
