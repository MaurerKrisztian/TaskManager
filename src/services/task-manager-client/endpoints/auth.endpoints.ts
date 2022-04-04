import {ApiService} from "../../api.service";
import {Injectable} from "@angular/core";

export interface SuccessfulLoginResult {
  token: string;
  username: string;
  userId: string;
}


@Injectable()
export class AuthEndpoints {
  endpoint: string = 'auth'

  constructor(private readonly api: ApiService) {
  }

  login(user: {username: string, password: string}){
    this.api.post(`${this.endpoint}/login`, user)
  }

}
