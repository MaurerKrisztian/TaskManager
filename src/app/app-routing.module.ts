import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TimelinetasksComponent} from "./timelinetasks/timelinetasks.component";

const routes: Routes = [
  {
    path: 'taskboards', component: DashboardComponent,
  },
  {path: 'login', component: LoginComponent},
  {path: 'timeline', component: TimelinetasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
