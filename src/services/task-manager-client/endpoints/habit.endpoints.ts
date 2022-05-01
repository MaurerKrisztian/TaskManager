import { RESTEndpoints } from '../services/REST.endpoints';
import { Injectable } from '@angular/core';

export interface IHabit {
  name: string;
  description?: string;
  startDate: Date;
  userId: string;
  createdAt?: Date;
  _id: string;
}

@Injectable()
export class HabitEndpoints extends RESTEndpoints<IHabit> {
  endpoint = 'habit';

  getStatusesForHabit(habitId: string) {
    return this.api.get(`${this.endpoint}/${habitId}/statuses`).toPromise();
  }
}
