import { Component, OnInit } from '@angular/core';
import { TaskMangerClientApi } from '../../../services/task-manager-client/task-manger-client.api';
import { IWeight } from '../../../services/task-manager-client/endpoints/weight.endpoints';
import { IChartData } from '../../charts/charts.component';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss'],
})
export class WeightComponent implements OnInit {
  weights: IWeight[] = [];

  constructor(private readonly api: TaskMangerClientApi) {}

  async ngOnInit() {
    this.weights = await this.api.weight.getAll();
    await this.initChartData(this.weights);
  }

  async addWeight(value: string) {
    await this.api.weight.create({ weight: Number.parseFloat(value) });
    this.ngOnInit()
  }

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
  yAxisLabel = 'Weight';
  timeline = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  async initChartData(weights: IWeight[]) {
    this.multi = [];

    const data: IChartData = {
      name: 'Weight',
      series: [],
    };

    for (const weight of weights) {
      data.series.push({
        name: new Date(weight.date),
        value: weight.weight,
      });
    }

    console.log(data);
    this.multi = [data];
  }

  onSelect(event: any) {
    console.log(event);
  }

  async deleteWeight(weight: IWeight) {
    await this.api.weight.deleteById(weight._id);
    this.ngOnInit()
  }
}
