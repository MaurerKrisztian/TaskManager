import { RESTEndpoints } from '../services/REST.endpoints';
import { Injectable } from '@angular/core';

@Injectable()
export class HabitDayStatusEndpoints extends RESTEndpoints<IHabitDayStatus> {
  endpoint = 'habit-day-status';
}

export interface IHabitDayStatus {
  habitId: string;
  status: 'done' | 'not-done' | string;
  note: string;
  date: Date;
  userId: string;
  createdAt?: Date;
  _id: string;
}
