import {ApiService} from "./api.service";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

//todo
@Injectable()
export class TaskMangerApi {
  static ENDPOINTS = {
    boards: 'taskboard',
    tasks: 'task',
    login: 'task',
  };

  constructor(private readonly api: ApiService) {
  }

  getTaskById(id: string) {

  }

  getAllTask() {

  }

  deleteTask(id: string) {

  }

  updateTask(id: string) {

  }


  async uploadFile(file: FileList) {
    const headers = {
      'authorisation': AuthService.getToken()
    }

    const ids = []

    if (file) {
      for (let i = 0; i < file.length; i++) {
        let requestFormData: FormData = new FormData();
        // @ts-ignore
        requestFormData.append('file', file.item(i), file.item(i).name);
        requestFormData.append('body', JSON.stringify({}));
        const id = await this.api.post('files', requestFormData, {headers: headers}).toPromise();
        ids.push(id)
      }
    }
    return ids
  }


}
