import { RESTEndpoints } from '../services/REST.endpoints';
import { Injectable } from '@angular/core';
import { ITask } from './task.endpoints';

export interface IBoard {
  _id?: string;
  name: string;
  tasks: ITask[];
}

@Injectable()
export class BoardEndpoints extends RESTEndpoints<IBoard> {
  endpoint = 'taskboard';

  modeTask(
    boardId: string,
    body: { toBoard: string; index: number; taskId: string }
  ) {
    return this.api.patch(`taskboard/${boardId}/movetask`, body).toPromise();
  }
}
