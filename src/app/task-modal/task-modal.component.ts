import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskMangerClientApi } from '../../services/task-manager-client/task-manger-client.api';
import { IWorkSession } from '../../services/task-manager-client/endpoints/workedtime.endpoints';
import { FileInfoVm } from '../../services/task-manager-client/endpoints/file.endpoints';

export interface IModalData {
  taskId: string;
  boardEvent: EventEmitter<any>;
}

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
})
export class TaskModalComponent implements OnInit {
  enableEdit = false;
  isWorkSessionStarted = false;
  files: { downloadLink: string; filename: string }[] = [];
  // @ts-ignore
  task: ITask;

  boardRefs: { id: string; name: string }[] = [];

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IModalData,
    private readonly apiClient: TaskMangerClientApi
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async getTask(id: string) {
    this.task = await this.apiClient.task.findById(id);
    return this.task;
  }

  async ngOnInit() {
    this.boardRefs = (await this.apiClient.board.getAll()) as any;
    await this.getTask(this.data.taskId || '');
    this.data.boardEvent.subscribe(async () => {
      this.task = await this.getTask(this.data.taskId || '');
    });

    for (const id of this.task?.fileIds || []) {
      const fileInfo = await this.getFileInfo(id);
      this.files.push({
        downloadLink: this.apiClient.file.getFileDownloadLink(id),
        filename: fileInfo.filename,
      });
    }
    this.isWorkSessionStarted = await this.getIsWorkSessionStarted();

    await this.getWorkedTime();
  }

  async startTask() {
    await this.apiClient.workedTimes.start({
      start: new Date(),
      taskId: this.data.taskId,
    });
    this.data.boardEvent.emit('');
    this.isWorkSessionStarted = await this.getIsWorkSessionStarted();
  }

  async getIsWorkSessionStarted() {
    const activeSessison =
      await this.apiClient.workedTimes.getActiveWorkSession(this.data.taskId);
    return activeSessison?.length > 0;
  }

  async endTask() {
    await this.apiClient.workedTimes.end(this.data.taskId, {
      end: new Date(),
    });
    this.data.boardEvent.emit('');
    this.isWorkSessionStarted = await this.getIsWorkSessionStarted();
    this.getWorkedTime();
  }

  workedMinutes: { minutes: number; workSession: IWorkSession }[] = [];
  allWorkedMinutes = 0;

  async getWorkedTime() {
    this.workedMinutes = [];
    const workSessions: IWorkSession[] =
      await this.apiClient.workedTimes.getWorkedtimeByTask(this.data.taskId);
    for (const workSession of workSessions) {
      const minutes =
        (Math.abs(
          new Date(workSession.end).getTime() -
            new Date(workSession.start).getTime()
        ) /
          (1000 * 60)) %
        60;
      this.workedMinutes.push({
        minutes: minutes,
        workSession: workSession,
      });
      this.allWorkedMinutes += minutes;
    }
  }

  async getFileInfo(fileId: string): Promise<FileInfoVm> {
    return this.apiClient.file.getFileInfo(fileId);
  }

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

  editMode() {
    this.enableEdit = true;
  }

  async changeComplete() {
    if (!this.task) return;

    await this.apiClient.task.update(this.data.taskId, {
      isCompleted: !this.task.isCompleted,
    });

    this.data.boardEvent.emit('completeTask');
  }

  async save(editFields: { title: string; description: string }) {
    await this.apiClient.task.update(this.data.taskId, {
      title: editFields.title,
      description: editFields.description,
    });

    this.enableEdit = false;
    this.data.boardEvent.emit('saveTask');
  }

  async delete() {
    await this.apiClient.task.deleteById(this.data.taskId);
    this.data.boardEvent.emit('deleteTask');
    this.dialogRef.close();
  }

  dateToValue(date: any) {
    return new Date(date).toISOString()?.slice(0, 16);
  }

  tmpFiles: any;
  isSessionToggled = false;

  handleFileInput(event: any) {
    this.tmpFiles = event.files;
  }

  async saveTask(task: {
    description: string;
    title: string;
    startAt?: string;
    labels: string[];
    fileIds?: string[];
    boardId?: string;
  }) {
    task.fileIds = await this.apiClient.file.uploadFiles(this.tmpFiles);
    task.fileIds?.push(...(this.task.fileIds || []));
    if (task.startAt == '') task.startAt = undefined;

    await this.apiClient.task.update(this.data.taskId, {
      title: task.title,
      description: task.description,
      startAt: task.startAt,
      labels: task.labels,
      fileIds: task.fileIds,
      boardId: task?.boardId,
    });
    this.data.boardEvent.emit('edit');
    this.enableEdit = false;
  }

  toggleSessions() {
    this.isSessionToggled = !this.isSessionToggled;
  }

  boardSelection(value: string) {
    console.log(value);
  }

  getTaskBoardName() {
    return this.boardRefs.find((ref) => {
      return ref.id == this.task?.boardId;
    })?.name;
  }
}
