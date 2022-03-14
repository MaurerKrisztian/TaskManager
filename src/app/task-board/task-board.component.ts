import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ITask} from "../dashboard/dashboard.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

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
    }else {
      this.boardEvent.emit("")
    }
  }

  async createBoardTask(task: ITask) {
    await this.api.post(ApiService.ENDPOINTS.tasks, task).toPromise()
    this.boardEvent.emit('rerender')
  }

  addTask(task: { description: string; title: string, startAt?: string, labels?: string[] }) {
    console.log("ez a board", this.board)
    this.createBoardTask({
      boardId: this.board._id || '',
      title: task.title,
      description: task.description,
      startAt: task.startAt ? new Date(task.startAt) : undefined,
      labels: task.labels,
      createdAt: new Date(),
      isCompleted: false
    })
    this.dialogRef?.close()
  }

  async deleteBoard() {
    await this.api.del(ApiService.ENDPOINTS.boards + "/" + this.board._id).toPromise()
    this.boardEvent.emit('rerender')
  }

  openAddTaskDialog(template: any) {
    // const dialogRef = this.dialog.open(template);
    this.dialogRef = this.dialog.open(template);
    this.dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

export interface IBoard {
  _id?: string,
  name: string,
  tasks: ITask[]
}
