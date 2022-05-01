import { Component, OnInit } from '@angular/core';
import { TaskMangerClientApi } from '../../services/task-manager-client/task-manger-client.api';

export interface IHabit {
  name: string;
  description?: string;
  startDate: Date;
  _id: string;
}

@Component({
  selector: 'app-habit-tracker',
  templateUrl: './habit-tracker.component.html',
  styleUrls: ['./habit-tracker.component.scss'],
})
export class HabitTrackerComponent implements OnInit {
  habits: IHabit[] = [];

  constructor(private readonly api: TaskMangerClientApi) {}

  async ngOnInit() {
    this.habits = await this.getHabits();
    this.habits = this.habits.map((habit) => {
      habit.startDate = new Date(habit.startDate);
      return habit;
    });
  }

  async createHabit(name: string) {
    await this.api.habit.create({ name: name, startDate: new Date() });
    this.ngOnInit();
  }

  getHabits(): Promise<IHabit[]> | any[] {
    return this.api.habit.getAll() || [];
  }

  doneToday(_id: string, note: string) {
    this.api.habitDayStatus.create({
      date: new Date(),
      status: 'done',
      habitId: _id,
      note: note || '',
    });
    this.ngOnInit();
  }

  async delete(_id: string) {
    await this.api.habit.deleteById(_id);
    this.ngOnInit();
  }
}
