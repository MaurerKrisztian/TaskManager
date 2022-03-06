import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ITask} from "../dashboard/dashboard.component";
import {ApiService} from "../../services/api.service";

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

  @Input("boardEvent")
    // @ts-ignore
  boardEvent: EventEmitter<any>

  constructor(private readonly api: ApiService) {
  }

  ngOnInit(): void {
  }


  editMode() {
    this.enableEdit = true
  }

  async changeComplete() {
    if (!this.task) return
    // this.task.isCompleted = !this.task.isCompleted

    await this.api.patch('task/' + this.task._id || "", {
      isCompleted: !this.task.isCompleted,
    }).toPromise()


    this.boardEvent.emit("completeTask")
  }

  async save(editFields: { title: string, description: string }) {
    await this.api.patch('task/'+this.task._id || "", {
      title: editFields.title,
      description: editFields.description
    }).toPromise()
    // this.task.title = editFields.title
    // this.task.description = editFields.description
    this.enableEdit = false
    this.boardEvent.emit("saveTask")
  }

  async delete() {
    await this.api.del('task/' + this.task._id || "").toPromise()
    this.boardEvent.emit("deleteTask")
  }
}
