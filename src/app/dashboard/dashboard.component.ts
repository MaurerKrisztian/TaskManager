import {Component, EventEmitter, OnInit} from '@angular/core';
import {IBoard} from "../task-board/task-board.component";
import {ApiService} from "../../serrvices/api.service";
import {AuthService} from "../../serrvices/auth.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  boards: IBoard[] = []

  boardEvent: EventEmitter<any> = new EventEmitter<any>();


  constructor(private api: ApiService, private readonly router: Router) {
  }


  async ngOnInit() {
    if (!AuthService.isAuth()) {
      await this.router.navigate(['/login']);
    }

    this.boardEvent.subscribe( ()=> {this.rerender()})

    await this.rerender();
  }

  async rerender() {
    this.boards = await this.api.get(ApiService.ENDPOINTS.boards).toPromise();
  }

  async createBoard(name: string) {
    await this.api.post(ApiService.ENDPOINTS.boards, {name: name}).toPromise();
    await this.rerender()
  }

  async getBoardTask(boardId: string) {
    const boardTasks = await this.api.get(ApiService.ENDPOINTS.tasks + '/board/' + boardId).toPromise()
    console.log(boardTasks)
    return boardTasks
  }

}


export interface ITask {
  _id?: string

  title: string;

  description: string;

  createdAt: Date;

  isCompleted: boolean;

  boardId: string
}
