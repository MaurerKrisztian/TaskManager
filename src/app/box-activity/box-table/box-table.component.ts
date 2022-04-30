import { Component, OnInit } from '@angular/core';
import { IBoxContent } from '../box/box.component';

@Component({
  selector: 'app-box-table',
  templateUrl: './box-table.component.html',
  styleUrls: ['./box-table.component.scss'],
})
export class BoxTableComponent implements OnInit {
  private readonly dayInMs = 86_400_000;

  startDate: Date = new Date(new Date().getTime() - this.dayInMs * 3);

  boxes: IBoxContent[] = [];

  constructor() {}

  ngOnInit(): void {
    this.boxGenerator();
  }

  numberOfBox = 250;
  boxGenerator() {
    const currnetDate = new Date();
    for (let i = 0; i < this.numberOfBox; i++) {
      this.boxes.push({
        hoverText: 'test',
        date: new Date(currnetDate),
        state: new Date(currnetDate) <= this.startDate ? 'not-done' : 'skipped',
      });
      currnetDate.setTime(currnetDate.getTime() - 86_400_000);
    }
  }
}
