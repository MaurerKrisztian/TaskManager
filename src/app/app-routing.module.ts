import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimelinetasksComponent } from './timelinetasks/timelinetasks.component';
import { LogsComponent } from './logs/logs.component';
import { NotfoundComponent } from './elements/notfound/notfound.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ChartsComponent } from './charts/charts.component';
import { WeightComponent } from './fitness/weight/weight.component';
import { MacrosComponent } from './fitness/macros/macros.component';
import { BoxTableComponent } from './box-activity/box-table/box-table.component';
import { HabitTrackerComponent } from './habit-tracker/habit-tracker.component';
import { LabelEditorComponent } from './label-editor/label-editor.component';
import { VideocallComponent } from './videocall/videocall.component';

const routes: Routes = [
  { path: 'taskboards', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'timeline', component: TimelinetasksComponent },
  { path: '', component: TimelinetasksComponent },
  { path: 'logs', component: LogsComponent },
  { path: '404', component: NotfoundComponent },
  { path: 'soon', component: ComingSoonComponent },
  { path: 'chart', component: ChartsComponent },
  { path: 'weight', component: WeightComponent },
  { path: 'food-macros', component: MacrosComponent },
  { path: 'box-activity', component: BoxTableComponent },
  { path: 'habit', component: HabitTrackerComponent },
  { path: 'labels', component: LabelEditorComponent },
  { path: 'meeting', component: VideocallComponent },
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
