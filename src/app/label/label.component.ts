import { Component, Input, OnInit } from '@angular/core';
import { ILabel } from '../../services/task-manager-client/endpoints/label.endpoints';
import { TaskMangerClientApi } from '../../services/task-manager-client/task-manger-client.api';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
})
export class LabelComponent implements OnInit {
  @Input()
  // @ts-ignore
  label: ILabel;

  // // @ts-ignore
  // label: ILabel;

  constructor(private readonly api: TaskMangerClientApi) {}

  ngOnInit(): void {
  }
}
