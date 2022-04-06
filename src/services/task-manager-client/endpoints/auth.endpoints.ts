import {ApiService} from '../../api.service';
import {Injectable} from '@angular/core';

export interface SuccessfulLoginResult {
  token: string;
  username: string;
  userId: string;
}

@Injectable()
export class AuthEndpoints {
  endpoint = 'auth';

  constructor(private readonly api: ApiService) {
  }

  login(user: { username: string; password: string }) {
    return this.api.post(`${this.endpoint}/login`, user).toPromise();
  }


  getGoogleAuthLink(): Promise<{url:string}> {
    return this.api.get(`${this.endpoint}/googleurl`).toPromise();
  }

  getGoogleUserInfo() {
    return this.api.get(`${this.endpoint}/me`).toPromise();
  }

}
