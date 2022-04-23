import { Component, OnInit } from '@angular/core';
import {IChartData} from "../../charts/charts.component";

@Component({
  selector: 'app-label-chart',
  templateUrl: './label-chart.component.html',
  styleUrls: ['./label-chart.component.scss']
})
export class LabelChartComponent implements OnInit {



  ngOnInit(): void {
    // setInterval(() => {
    //   this.multi = [...this.multi, {
    //     name: 'USA',
    //     series: [
    //       {
    //         name: '2010',
    //         value: 1870000,
    //       },
    //       {
    //         name: '2011',
    //         value: 8270000,
    //       },
    //     ],
    //   }];
    //
    //
    // }, 1000);
  }

  multi: IChartData[] = [
    {
      name: 'Germany',
      series: [
        {
          name: '2010',
          value: 7300000,
        },
        {
          name: '2011',
          value: 8940000,
        },
      ],
    },

    {
      name: 'USA',
      series: [
        {
          name: '2010',
          value: 7870000,
        },
        {
          name: '2011',
          value: 8270000,
        },
      ],
    },

    {
      name: 'France',
      series: [
        {
          name: '2010',
          value: 5000002,
        },
        {
          name: '2011',
          value: 5800000,
        },
      ],
    },
  ];
  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendPosition: any = 'below';
  showXAxisLabel = true;
  yAxisLabel: any = 'Country';
  showYAxisLabel = true;
  xAxisLabel = 'Population';

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
