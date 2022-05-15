import { Component, OnInit } from '@angular/core';
import { TaskMangerClientApi } from '../../services/task-manager-client/task-manger-client.api';
import { ILabel } from '../../services/task-manager-client/endpoints/label.endpoints';

@Component({
  selector: 'app-label-editor',
  templateUrl: './label-editor.component.html',
  styleUrls: ['./label-editor.component.scss'],
})
export class LabelEditorComponent implements OnInit {
  labels: ILabel[] = [];

  constructor(private readonly api: TaskMangerClientApi) {}

  async ngOnInit() {
    this.labels = await this.api.label.getAll();
  }

  async update(
    param: { color: string; name: string; description: string },
    elementId: string
  ) {
    await this.api.label.update(elementId, param);
    this.ngOnInit();
  }

  async remove(_id: string) {
    await this.api.label.deleteById(_id);
    this.ngOnInit()
  }
}
