import {Component, Input, OnInit} from '@angular/core';
import {ITask} from "./ITask";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  enableEdit = false

  @Input("task")
    // @ts-ignore
  task: ITask

  constructor() {
  }

  ngOnInit(): void {
  }


  edit() {
    this.enableEdit = true
  }

  changeComplete() {
    if (!this.task) return
    this.task.isCompleted = !this.task.isCompleted
  }

  save(editFields: {title: string, description: string}) {
    this.task.title = editFields.title
    this.task.description = editFields.description
    this.enableEdit = false
  }
}
