import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ITask} from "../dashboard/dashboard.component";
import {ApiService} from "../../services/api.service";

export interface FileInfoVm {
  length: number;

  chunkSize: number;

  filename: string;

  md5: string;

  contentType: string;
}

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


  files: { downloadLink: string, filename: string }[] = []

  constructor(private readonly api: ApiService) {
  }

  async ngOnInit() {
    for (const id of this.task?.fileIds || []) {
      const fileInfo = await this.getFileInfo(id);
      this.files.push({downloadLink: this.getFileDownloadLink(id), filename: fileInfo.filename})
    }
  }


  getFileDownloadLink(fileId: string) {
    return `${this.api.HOST}files/${fileId}`
  }

  async getFileInfo(fileId: string): Promise<FileInfoVm> {
    return await this.api.get(`files/${fileId}/info`).toPromise() as FileInfoVm
  }

  getRemainingTime(startDate: Date | any) {
    let result = {d: 0, h: 0, m: 0, negative: false}
    let dateFuture = new Date(startDate).getTime();
    let dateNow = new Date().getTime();

    if (dateFuture < dateNow){
      const tmp = dateFuture
      dateFuture = dateNow
      dateNow = tmp
      result.negative = true
    }

    let seconds = Math.floor((dateFuture - (dateNow)) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
    result.d = days
    result.h = hours
    result.m = minutes
    return result
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
    await this.api.patch('task/' + this.task._id || "", {
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
