import {Component} from '@angular/core';
import {ITask} from "./task/ITask";
import {IBoard} from "./task-board/task-board.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'taskManager';

  board: IBoard = {
    name: "test1",
    tasks: [{
      title: "titlef adsfssssss",
      description: "description adsfasdfasdf",
      createdAt: new Date(),
      isCompleted: false
    },
      {
        title: "titlef adsf",
        description: "description adsfasdfasdf",
        createdAt: new Date(),
        isCompleted: true
      },
      {
        title: "titlef adsf",
        description: "description adsfasdfasdf",
        createdAt: new Date(),
        isCompleted: false
      }]
  }


  board2: IBoard = {
    name: "test1",
    tasks: [{
      title: "titlef adsfssssss",
      description: "description adsfasdfasdf",
      createdAt: new Date(),
      isCompleted: false
    },
      {
        title: "titlef adsf",
        description: "description adsfasdfasdf",
        createdAt: new Date(),
        isCompleted: true
      },
      {
        title: "titlef adsf",
        description: "description adsfasdfasdf",
        createdAt: new Date(),
        isCompleted: false
      }]
  }

}
