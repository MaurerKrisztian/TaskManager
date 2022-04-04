import {Injectable} from "@angular/core";
import {ApiService} from "../../api.service";

@Injectable()
export class EmailEndpoints {
  endpoint: string = 'email'

  constructor(private readonly api: ApiService) {
  }

  async getEmail() {
    return this.api.get(`${this.endpoint}/todaytasks`).toPromise()
  }

  setupDailyEmail(body: { date: Date }) {
    return this.api.post("email/setupeveryday", body).toPromise()
  }
}
