import { Component, Input, OnInit } from '@angular/core';
import { TaskMangerClientApi } from '../../../services/task-manager-client/task-manger-client.api';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface IBoxContent {
  id?: string;
  hoverText: string;
  date: Date;
  state?: 'not-done' | 'done' | 'skipped' | string;
}

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
  @Input()
  contetnt: IBoxContent = {
    hoverText: '',
    date: new Date(),
    state: 'not-done',
  };

  private readonly stateTextMap = {
    'not-done': '',
    done: 'Well Done!',
    skipped: 'Skipped.',
  };

  // @ts-ignore
  dialogRef: MatDialogRef<unknown, any>;

  constructor(
    private readonly api: TaskMangerClientApi,
    public dialog: MatDialog
  ) {}

  getDisplayText() {
    return `${
      // @ts-ignore
      this.stateTextMap[this.contetnt.state]
    } \n ${this.contetnt.hoverText} \n ${new Date(
      this.contetnt.date
    ).toLocaleDateString()}`;
  }

  ngOnInit(): void {}

  async openDayPopup(template: any, contetnt: IBoxContent) {
    console.log(contetnt);
    if (contetnt.id) {
      const day = await this.api.habitDayStatus.findById(contetnt.id);
      this.dialogRef = this.dialog.open(template, {
        // disableClose: true,
        data: day,
      });
    }
  }

  async editDay(param: { id: string; note: string; status: string }) {
    await this.api.habitDayStatus.update(param.id, {
      note: param.note,
      status: param.status,
    });
    this.dialogRef.close();
    this.contetnt.state = param.status;
    this.contetnt.hoverText = param.note;
  }
}
