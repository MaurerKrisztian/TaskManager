import { Component, Input, OnInit } from '@angular/core';
import { IBoxContent } from '../box/box.component';
import { IHabitDayStatus } from '../../../services/task-manager-client/endpoints/habit-day-status.endpoints';
import { TaskMangerClientApi } from '../../../services/task-manager-client/task-manger-client.api';
import { IHabit } from '../../habit-tracker/habit-tracker.component';

@Component({
  selector: 'app-box-table',
  templateUrl: './box-table.component.html',
  styleUrls: ['./box-table.component.scss'],
})
export class BoxTableComponent implements OnInit {
  private readonly dayInMs = 86_400_000;

  @Input()
  // @ts-ignore
  habit: IHabit;

  @Input()
  startDate: Date = new Date(new Date().getTime() - this.dayInMs * 3);
  @Input()
  numberOfBox = 200;

  @Input()
  boxStatuses: IHabitDayStatus[] = [];

  boxes: IBoxContent[] = [];

  constructor(private readonly api: TaskMangerClientApi) {}

  async ngOnInit() {
    this.boxStatuses = await this.api.habit.getStatusesForHabit(this.habit._id);
    this.boxGenerator();
  }

  boxGenerator() {
    const currnetDate = new Date();

    for (let i = 0; i < this.numberOfBox; i++) {
      const boxDate = new Date(new Date().getTime() - this.dayInMs * i);
      const foundBox = this.boxStatuses.find((status) => {
        const date = new Date(status.date);
        return (
          boxDate.getFullYear() == date.getFullYear() &&
          boxDate.getMonth() == date.getMonth() &&
          boxDate.getDate() == date.getDate()
        );
      });
      if (foundBox) {
        this.boxes.push({
          hoverText: foundBox.note,
          date: new Date(boxDate),
          state: foundBox.status,
        });
      } else {
        this.boxes.push({
          hoverText: '',
          date: new Date(boxDate),
          state: new Date(boxDate) <= this.startDate ? 'not-done' : 'skipped',
        });
      }
      currnetDate.setTime(currnetDate.getTime() - 86_400_000);
    }
  }
}
