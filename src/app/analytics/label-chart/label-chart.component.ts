import { Component, OnInit } from '@angular/core';
import { IChartData } from '../../charts/charts.component';
import { TaskMangerClientApi } from '../../../services/task-manager-client/task-manger-client.api';
import { ILabel } from '../../../services/task-manager-client/endpoints/label.endpoints';

@Component({
  selector: 'app-label-chart',
  templateUrl: './label-chart.component.html',
  styleUrls: ['./label-chart.component.scss'],
})
export class LabelChartComponent implements OnInit {
  constructor(private readonly api: TaskMangerClientApi) {}

  labels: ILabel[] = [];

  async ngOnInit() {
    this.multi = [];
    this.labels = await this.api.label.getAll();

    for (const label of this.labels) {
      const usageCount = (await this.api.task.getTaskByLabel(label.name)).length;

      const chartData: IChartData = {
        name: label.name,
        series: [
          {
            name: 'usage',
            value: usageCount,
          },
        ],
      };
      this.multi = [...this.multi, chartData];
    }
  }

  multi: IChartData[] = [];
  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendPosition: any = 'below';
  showXAxisLabel = true;
  yAxisLabel: any = 'Labels';
  showYAxisLabel = true;
  xAxisLabel = 'Current usage count';

  colorScheme: any = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA'],
  };
  schemeType: any = 'linear';

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
