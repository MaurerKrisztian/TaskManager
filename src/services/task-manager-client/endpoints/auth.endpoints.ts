import {ApiService} from "../../api.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthEndpoints {
  endpoint: string = 'auth'

  constructor(private readonly api: ApiService) {
  }

  login(user: {username: string, password: string}){
    this.api.post(`${this.endpoint}/login`, user)
  }

}
