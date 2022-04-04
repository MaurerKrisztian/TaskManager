import {RESTEndpoints} from "../services/REST.endpoints";
import {Injectable} from "@angular/core";
import {IWorkSession} from "./workedtime.endpoints";


export interface ITask {
  _id?: string

  title: string;

  description: string;

  createdAt: Date;

  isCompleted: boolean;

  boardId?: string

  startAt?: Date;

  labels?: string[];

  fileIds?: string[]

  workedTimes: IWorkSession[]
}


@Injectable()
export class TaskEndpoints extends RESTEndpoints<ITask>{
  endpoint: string = 'task';

}
