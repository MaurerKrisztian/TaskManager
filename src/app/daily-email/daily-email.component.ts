import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskMangerClientApi } from '../../services/task-manager-client/task-manger-client.api';

@Component({
  selector: 'app-daily-email',
  templateUrl: './daily-email.component.html',
  styleUrls: ['./daily-email.component.scss'],
})
export class DailyEmailComponent implements OnInit {
  constructor(
    private readonly api: TaskMangerClientApi,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  async getEmail() {
    await this.api.email.getEmail();
  }

  async setupEmail(time: string) {
    const h = Number.parseInt(time.split(':')[0]);
    const m = Number.parseInt(time.split(':')[1]);
    const date = new Date();
    date.setHours(h, m);
    await this.api.email.setupDailyEmail({ date: date });
    this.dialogRef.close();
  }

  // @ts-ignore
  dialogRef: MatDialogRef<unknown, any>;

  openDialog(template: any) {
    this.dialogRef = this.dialog.open(template);
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
