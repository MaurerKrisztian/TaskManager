import {Component, EventEmitter, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {IBoard} from "../task-board/task-board.component";

@Component({
  selector: 'app-timelinetasks',
  templateUrl: './timelinetasks.component.html',
  styleUrls: ['./timelinetasks.component.scss']
})
export class TimelinetasksComponent implements OnInit {

  // @ts-ignore
  board: IBoard

  boardEvent: EventEmitter<any> = new EventEmitter()
  constructor(private readonly api: ApiService) {
  }

  async ngOnInit() {
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
