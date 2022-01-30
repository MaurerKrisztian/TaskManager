import {Component, Input, OnInit} from '@angular/core';
import {ITask} from "../task/ITask";

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {

  @Input()
    // @ts-ignore
  board: IBoard

  constructor() {
  }

  ngOnInit(): void {
  }

  removeTask(removableTask: ITask) {
    this.board.tasks = this.board?.tasks.filter(task => {
      return task != removableTask
    })
  }

  addTask(task: { description: string; title: string }) {
    this.board.tasks = [{
      title: task.title,
      description: task.description,
      createdAt: new Date(),
      isCompleted: false
    }, ...this.board.tasks]
  }
}

export interface IBoard {
  name: string,
  tasks: ITask[]
}
