import {RESTEndpoints} from "../services/REST.endpoints";
import {ITask} from "../../../app/dashboard/dashboard.component";
import {Injectable} from "@angular/core";

@Injectable()
export class TaskEndpoints extends RESTEndpoints<ITask>{
  endpoint: string = 'task';

}
