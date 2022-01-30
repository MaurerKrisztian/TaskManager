import { Component, OnInit } from '@angular/core';
import {IBoard} from "../task-board/task-board.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

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
