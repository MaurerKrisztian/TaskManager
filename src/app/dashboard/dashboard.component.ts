import {Component, OnInit} from '@angular/core';
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


  constructor(private api: ApiService, private readonly router: Router) {
  }


  async ngOnInit() {
    if (!AuthService.isAuth()) {
      await this.router.navigate(['/login']);
    }

    const boards = await this.api.get(ApiService.ENDPOINTS.boards).toPromise();
    console.log(boards)
    this.boards = boards
  }

  async createBoard(name: string) {
    await this.api.post(ApiService.ENDPOINTS.boards, {name: name}).toPromise();
  }

  async getBoardTask(boardId: string) {
    const boardTasks = await this.api.get(ApiService.ENDPOINTS.tasks + '/board/' + boardId).toPromise()
    console.log(boardTasks)
    return boardTasks
  }

}


export interface ITask {
  title: string;

  description: string;

  createdAt: Date;

  isCompleted: boolean;

  boardId: string
}
