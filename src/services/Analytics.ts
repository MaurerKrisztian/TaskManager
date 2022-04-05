import {Injectable} from "@angular/core";

@Injectable()
export class Analytics {
  PREFIX: string = 'ga-'
  LOGIN_BTN = `${this.PREFIX}login-btn`;
  REGISTRATION_BTN = `${this.PREFIX}registration-btn`
  CREATE_TASK = `${this.PREFIX}create-task-btn`
  CREATE_BOARD = `${this.PREFIX}create-board-btn`
}
