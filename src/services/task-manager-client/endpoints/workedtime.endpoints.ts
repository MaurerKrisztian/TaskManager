import {ApiService} from "../../api.service";
import {Injectable} from "@angular/core";

@Injectable()
export class WorkedtimeEndpoints {
  endpoint: string = 'workedtime'

  constructor(private readonly api: ApiService) {
  }

  start(startData: { start: Date, taskId: string }) {
    return this.api.post(`${this.endpoint}/start`, startData).toPromise()
  }

  end(taskId: string, body: { end: Date }) {
    return this.api.post(`${this.endpoint}/${taskId}`, body).toPromise()
  }

  getWorkedtimeByTask(taskId: string) {
    return this.api.get(`${this.endpoint}/task/${taskId}`).toPromise()
  }

  getActiveWorkSession(id: string) {
    return this.api.get(`${this.endpoint}/getActiveWorkSession/${id}`).toPromise();
  }

}
