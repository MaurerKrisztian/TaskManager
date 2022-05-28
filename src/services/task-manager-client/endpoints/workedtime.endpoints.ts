import { ApiService } from '../../api.service';
import { Injectable } from '@angular/core';

export interface IWorkSession {
  taskId: string;

  start: Date;

  end: Date;
}

@Injectable()
export class WorkedtimeEndpoints {
  endpoint = 'workedtime';

  constructor(private readonly api: ApiService) {}

  start(startData: { start: Date; taskId: string }) {
    return this.api.post(`${this.endpoint}/start`, startData).toPromise();
  }

  workedDaysAggregation(groupedBy: groupedByType): Promise<any[]> {
    return this.api
      .get(`${this.endpoint}/chart/workeddays?groupedBy=${groupedBy}`)
      .toPromise();
  }

  end(taskId: string, body: { end: Date }) {
    return this.api.post(`${this.endpoint}/end/${taskId}`, body).toPromise();
  }

  getWorkedtimeByTask(taskId: string) {
    return this.api.get(`${this.endpoint}/task/${taskId}`).toPromise();
  }

  getActiveWorkSession(id: string) {
    return this.api.get(`${this.endpoint}/activeWorkSession/${id}`).toPromise();
  }
}
export type groupedByType = 'hour' | 'day' | 'month';
