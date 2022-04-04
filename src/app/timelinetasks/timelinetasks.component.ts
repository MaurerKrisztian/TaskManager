import {Component, EventEmitter, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-timelinetasks',
  templateUrl: './timelinetasks.component.html',
  styleUrls: ['./timelinetasks.component.scss']
})
export class TimelinetasksComponent implements OnInit {

  // @ts-ignore
  board: IBoard

  boardEvent: EventEmitter<any> = new EventEmitter()
  constructor(private readonly api: ApiService, private readonly router: Router) {
  }

  async ngOnInit() {
    if (!AuthService.isAuth()) {
      await this.router.navigate(['/login']);
    }

    await this.getTasks()
    this.boardEvent.subscribe(async () => {
      await this.getTasks()
    })
  }

  async getTasks() {
    const tasks = (await this.api.get('task').toPromise())
    this.board = {
      name: 'tasks',
      tasks: tasks,
    };
  }

}
