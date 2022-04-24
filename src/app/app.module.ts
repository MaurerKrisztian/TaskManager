import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskComponent } from './task/task.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptorService } from '../services/token-interceptor.service';
import { ApiService } from '../services/api.service';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimelinetasksComponent } from './timelinetasks/timelinetasks.component';
import { LogsComponent } from './logs/logs.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NotfoundComponent } from './elements/notfound/notfound.component';
import { ProgressBarComponent } from './elements/progress-bar/progress-bar.component';
import { MenuComponent } from './elements/menu/menu.component';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { TaskMangerClientApi } from '../services/task-manager-client/task-manger-client.api';
import { BoardEndpoints } from '../services/task-manager-client/endpoints/board.endpoints';
import { AuthEndpoints } from '../services/task-manager-client/endpoints/auth.endpoints';
import { FileEndpoints } from '../services/task-manager-client/endpoints/file.endpoints';
import { TaskEndpoints } from '../services/task-manager-client/endpoints/task.endpoints';
import { UserEndpoints } from '../services/task-manager-client/endpoints/user.endpoints';
import { WorkedtimeEndpoints } from '../services/task-manager-client/endpoints/workedtime.endpoints';
import { EmailEndpoints } from '../services/task-manager-client/endpoints/email.endpoints';
import { DailyEmailComponent } from './daily-email/daily-email.component';
import { Analytics } from '../services/Analytics';
import { SchedulesEndpoints } from '../services/task-manager-client/endpoints/schedules.endpoints';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ChartsComponent } from './charts/charts.component';
import { BarChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { LabelChartComponent } from './analytics/label-chart/label-chart.component';
import { WorkedTimeChartComponent } from './analytics/worked-time-chart/worked-time-chart.component';
import { LabelEndpoints } from '../services/task-manager-client/endpoints/label.endpoints';
import { WeightComponent } from './fitness/weight/weight.component';
import { WeightEndpoints } from '../services/task-manager-client/endpoints/weight.endpoints';

@NgModule({
  declarations: [
    AppComponent,
    TaskBoardComponent,
    TaskComponent,
    LoginComponent,
    DashboardComponent,
    TimelinetasksComponent,
    LogsComponent,
    NotfoundComponent,
    ProgressBarComponent,
    MenuComponent,
    TaskModalComponent,
    DailyEmailComponent,
    ComingSoonComponent,
    ChartsComponent,
    LabelChartComponent,
    WorkedTimeChartComponent,
    WeightComponent,
  ],
  imports: [
    NgxChartsModule,
    RichTextEditorAllModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DragDropModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    FormsModule,
    BarChartModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    ApiService,
    TaskMangerClientApi,
    Analytics,
    BoardEndpoints,
    AuthEndpoints,
    FileEndpoints,
    TaskEndpoints,
    UserEndpoints,
    WorkedtimeEndpoints,
    EmailEndpoints,
    LabelEndpoints,
    WeightEndpoints,
    SchedulesEndpoints,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
