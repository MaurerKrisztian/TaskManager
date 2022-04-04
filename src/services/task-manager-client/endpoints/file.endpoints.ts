import {ApiService} from "../../api.service";
import {AuthService} from "../../auth.service";
import {FileInfo} from "@angular-devkit/build-angular/src/utils/index-file/augment-index-html";
import {Injectable} from "@angular/core";

export interface FileInfoVm {
  length: number;

  chunkSize: number;

  filename: string;

  md5: string;

  contentType: string;
}

@Injectable()
export class FileEndpoints {
  endpoint: string = 'file';

  constructor(private readonly api: ApiService) {
  }

  upload(requestFormData: FormData, options?: any): Promise<string> {
    const headers = {
      'authorisation': AuthService.getToken()
    }
    return this.api.post(this.endpoint, requestFormData, {...{headers: headers}, ...options}).toPromise();
  }

  getFileStream(id: string): any {
    return this.api.get(`${this.endpoint}/${id}`).toPromise()
  }

  getFileInfo(id: string): Promise<FileInfo> {
    return this.api.get(`${this.endpoint}/${id}/info`).toPromise()
  }

  async uploadFiles(file: FileList): Promise<string[]> {
    const ids = []
    if (file) {
      for (let i = 0; i < file.length; i++) {
        let requestFormData: FormData = new FormData();
        // @ts-ignore
        requestFormData.append('file', file.item(i), file.item(i).name);
        requestFormData.append('body', JSON.stringify({}));
        const id = await this.upload(requestFormData)
        ids.push(id)
      }
    }
    return ids
  }

  getFileDownloadLink(fileId: string): string {
    return `${this.api.HOST}files/${fileId}`
  }
}
