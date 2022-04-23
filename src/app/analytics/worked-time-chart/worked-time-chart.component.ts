import { Component, OnInit } from '@angular/core';
import { IChartData } from '../../charts/charts.component';
import { TaskMangerClientApi } from '../../../services/task-manager-client/task-manger-client.api';
import { groupedByType } from '../../../services/task-manager-client/endpoints/workedtime.endpoints';

@Component({
  selector: 'app-worked-time-chart',
  templateUrl: './worked-time-chart.component.html',
  styleUrls: ['./worked-time-chart.component.scss'],
})
export class WorkedTimeChartComponent implements OnInit {
  multi: IChartData[] = [];
  view: [number, number] = [700, 300];

  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  yAxisLabel = 'Worked hours';
  timeline = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  selectOption: groupedByType[] = ['hour', 'day', 'month'];

  constructor(private readonly api: TaskMangerClientApi) {}

  async ngOnInit() {
    await this.initChartData('hour');
  }

  async initChartData(groupedBy: groupedByType) {
    this.multi = [];

    const data: IChartData = {
      name: 'Worked time hours',
      series: [],
    };

    const aggr = await this.api.workedTimes.workedDaysAggregation(groupedBy);
    for (const entity of aggr) {
      const date = new Date();
      date.setFullYear(
        entity._id.year,
        entity._id.month || 1,
        entity._id.day || 1
      );
      date.setHours(entity._id.hour || 0, entity._id.minute || 0);

      data.series.push({
        name: date,
        value: this.msToHr(entity.sum),
      });

      this.multi = [data];
    }
  }

  msToHr(ms: number) {
    return ms / 60000 / 60;
  }

  onSelect(event: any) {
    console.log(event);
  }

  async onOptionsSelected(value: string) {
    await this.initChartData(value as groupedByType);
  }
}
