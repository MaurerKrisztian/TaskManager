import { Component, OnInit } from '@angular/core';
import { TaskMangerClientApi } from '../../../services/task-manager-client/task-manger-client.api';
import { IFoodMacros } from '../../../services/task-manager-client/endpoints/food-macros.endpoints';
import {IChartData} from "../../charts/charts.component";
import {IWeight} from "../../../services/task-manager-client/endpoints/weight.endpoints";

@Component({
  selector: 'app-macros',
  templateUrl: './macros.component.html',
  styleUrls: ['./macros.component.scss'],
})
export class MacrosComponent implements OnInit {

  macros:IFoodMacros[] = []

  constructor(private readonly api: TaskMangerClientApi) {}

  async ngOnInit() {
    await this.getMacros();
    await this.initChartData(this.macros);
  }

  async createMacro(
    macros: Omit<IFoodMacros, 'userId' | 'createdAt' | 'date'>
  ) {
    await this.api.foodMacros.create({ ...macros, date: new Date() });
    this.ngOnInit()
  }

  async getMacros() {
    this.macros = await this.api.foodMacros.getAll();
  }

  async remove(_id: any) {
    await this.api.foodMacros.deleteById(_id);
    this.ngOnInit()
  }



  async addWeight(value: string) {
    await this.api.weight.create({
      weight: Number.parseFloat(value),
      date: new Date(),
    });
    this.ngOnInit();
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
  xAxisLabel = 'macros';
  yAxisLabel = 'gram';
  timeline = true;

  colorScheme: any = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  };

  async initChartData(macros: IFoodMacros[]) {
    this.multi = [];

    const protein: IChartData = {
      name: 'protein',
      series: [],
    };

    const fat: IChartData = {
      name: 'Fat',
      series: [],
    };
    const ch: IChartData = {
      name: 'ch',
      series: [],
    };

    for (const macro of macros) {
      protein.series.push({
        name: new Date(macro.date),
        value: macro.protein,
      });
      fat.series.push({
        name: new Date(macro.date),
        value: macro.fat,
      });
      ch.series.push({
        name: new Date(macro.date),
        value: macro.carbohydrates,
      });
    }

    this.multi = [protein, fat, ch];
  }

  onSelect(event: any) {
    console.log(event);
  }
}
