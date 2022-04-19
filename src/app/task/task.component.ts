import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  IModalData,
  TaskModalComponent,
} from '../task-modal/task-modal.component';
import { TaskMangerClientApi } from '../../services/task-manager-client/task-manger-client.api';
import { ITask } from '../../services/task-manager-client/endpoints/task.endpoints';

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

  constructor(
    public dialog: MatDialog,
    private readonly api: TaskMangerClientApi
  ) {}

  async ngOnInit() {}

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
