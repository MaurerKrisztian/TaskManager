import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../serrvices/api.service";
import {ITask} from "../dashboard/dashboard.component";

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {

  @Input()
    // @ts-ignore
  board: IBoard

  constructor(private readonly api: ApiService) {
  }

  ngOnInit(): void {
  }

  removeTask(removableTask: ITask) {
    this.board.tasks = this.board?.tasks.filter(task => {
      return task != removableTask
    })
  }


  async createBoardTask(task: ITask) {
    await this.api.post(ApiService.ENDPOINTS.tasks, task).toPromise()
  }

  addTask(task: { description: string; title: string }) {
    console.log("ez a board", this.board)
    this.createBoardTask({
      boardId: this.board._id || '',
      title: task.title,
      description: task.description,
      createdAt: new Date(),
      isCompleted: false
    })
    //   this.board.tasks = [{
    //     title: task.title,
    //     description: task.description,
    //     createdAt: new Date(),
    //     isCompleted: false
    //   }, ...this.board.tasks]
  }
}

export interface IBoard {
  _id?: string,
  name: string,
  tasks: ITask[]
}
