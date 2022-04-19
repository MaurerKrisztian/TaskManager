import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  IModalData,
  TaskModalComponent,
} from '../task-modal/task-modal.component';
import { TaskMangerClientApi } from '../../services/task-manager-client/task-manger-client.api';
import { ITask } from '../../services/task-manager-client/endpoints/task.endpoints';
import { IWorkSession } from '../../services/task-manager-client/endpoints/workedtime.endpoints';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  enableEdit = false;
  isWorkSessionStarted = false;

  @Input('task')
  // @ts-ignore
  task: ITask;

  @Input('boardEvent')
  // @ts-ignore
  boardEvent: EventEmitter<any>;

  files: { downloadLink: string; filename: string }[] = [];

  workedTime = 0;

  constructor(
    public dialog: MatDialog,
    private readonly api: TaskMangerClientApi
  ) {}

  async ngOnInit() {
    this.workedTime = await this.getWorkedTime();
  }

  // todo calculate with api
  async getWorkedTime() {
    const workSessions: IWorkSession[] =
      await this.api.workedTimes.getWorkedtimeByTask(this.task._id as string);
    let sum = 0;
    for (const workSession of workSessions) {
      const minutes =
        (Math.abs(
          new Date(workSession.end).getTime() -
            new Date(workSession.start).getTime()
        ) /
          (1000 * 60)) %
        60;
      sum += minutes;
    }
    return sum;
  }


  // todo duplication
  getRemainingTime(startDate: Date | any) {
    const result = { d: 0, h: 0, m: 0, s: 0, negative: false };
    let dateFuture = new Date(startDate).getTime();
    let dateNow = new Date().getTime();

    if (dateFuture < dateNow) {
      const tmp = dateFuture;
      dateFuture = dateNow;
      dateNow = tmp;
      result.negative = true;
    }

    let seconds = Math.floor((dateFuture - dateNow) / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    hours = hours - days * 24;
    minutes = minutes - days * 24 * 60 - hours * 60;
    seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
    result.d = days;
    result.h = hours;
    result.m = minutes;
    result.s = seconds;

    return result;
  }

  openExtendedDialog() {
    const modalData: IModalData = {
      taskId: this.task._id || '',
      boardEvent: this.boardEvent,
    };
    this.dialog.open(TaskModalComponent, {
      width: '80%',
      height: '80%',
      data: modalData,
    });
  }
}
