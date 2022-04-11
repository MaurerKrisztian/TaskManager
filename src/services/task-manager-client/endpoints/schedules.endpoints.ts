import { Injectable } from '@angular/core';
import { RESTEndpoints } from '../services/REST.endpoints';

export interface IScheduleData {
  type: string | 'dailyEmail' | 'WeeklyReport';
}

export interface ISchedules<T> {
  _id: string;
  userId: string;
  createOptions: T & IScheduleData;
}

@Injectable()
export class SchedulesEndpoints extends RESTEndpoints<ISchedules<any>> {
  endpoint = 'schedules';
}
