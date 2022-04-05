import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TaskMangerClientApi } from '../../services/task-manager-client/task-manger-client.api';

@Component({
  selector: 'app-timelinetasks',
  templateUrl: './timelinetasks.component.html',
  styleUrls: ['./timelinetasks.component.scss'],
})
export class TimelinetasksComponent implements OnInit {
  // @ts-ignore
  board: IBoard;

  boardEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly api: TaskMangerClientApi,
    private readonly router: Router
  ) {}

  async ngOnInit() {
    if (!AuthService.isAuth()) {
      await this.router.navigate(['/login']);
    }

    await this.getTasks();
    this.boardEvent.subscribe(async () => {
      await this.getTasks();
    });
  }

  async getTasks() {
    const tasks = await this.api.task.getAll();
    this.board = {
      name: 'tasks',
      tasks: tasks,
    };
  }
}
