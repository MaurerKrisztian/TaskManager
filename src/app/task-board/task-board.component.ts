import {Component, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {IBoard} from "../../services/task-manager-client/endpoints/board.endpoints";
import {ITask} from "../../services/task-manager-client/endpoints/task.endpoints";

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.scss']
})
export class TaskBoardComponent implements OnInit {

  @Input()
    // @ts-ignore
  board: IBoard

  @Input()
    // @ts-ignore
  dragable: boolean

  @Input()
    // @ts-ignore
  boardEvent: EventEmitter<any>

  // @ts-ignore
  dialogRef: MatDialogRef<unknown, any>

  showCompleted = true

  constructor(private readonly api: ApiService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  showCompletedChange() {
    this.showCompleted = !this.showCompleted
    if (!this.showCompleted) {
      this.board.tasks = this.board.tasks.filter((task) => {
        return !task.isCompleted
      })
    } else {
      this.boardEvent.emit("")
    }
  }

  async createBoardTask(task: ITask) {
    await this.api.post(ApiService.ENDPOINTS.tasks, task).toPromise()
    this.boardEvent.emit('rerender')
  }

  async addTask(task: { description: string; title: string, startAt?: string, labels: string[], fileIds?: string[] }) {
    console.log(task.description)
    if (this.tmpFiles) {
      task.fileIds = await this.uploadFile()
    }

    await this.createBoardTask({
      boardId: this.board._id || undefined,
      title: task.title,
      description: task.description,
      startAt: task.startAt ? new Date(task.startAt) : undefined,
      labels: task.labels,
      createdAt: new Date(),
      isCompleted: false,
      fileIds: task?.fileIds || [],
      workedTimes: []
    })

    this.dialogRef?.close()
  }

  async uploadFile(file: FileList = this.tmpFiles) {
    const headers = {
      'authorisation': AuthService.getToken()
    }

    const ids = []

    if (file) {
      for (let i = 0; i < file.length; i++) {
        let requestFormData: FormData = new FormData();
        // @ts-ignore
        requestFormData.append('file', file.item(i), file.item(i).name);
        requestFormData.append('body', JSON.stringify({}));
        const id = await this.api.post('files', requestFormData, {headers: headers}).toPromise();
        ids.push(id)
      }
    }
    //
    // requestFormData.append('body', JSON.stringify({}));
    // const res = await this.api.post('files', requestFormData, {headers: headers}).toPromise();

    return ids
  }


  async deleteBoard() {
    await this.api.del(ApiService.ENDPOINTS.boards + "/" + this.board._id).toPromise()
    this.boardEvent.emit('rerender')
  }

  openAddTaskDialog(template: any) {
    // const dialogRef = this.dialog.open(template);
    this.dialogRef = this.dialog.open(template, { width: "80%", maxWidth: "80%", height: "90%", maxHeight: "90%"});
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // @ts-ignore
  tmpFiles: FileList

  handleFileInput(event: any) {
    this.tmpFiles = event.files
  }

}
