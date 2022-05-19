import { Component, OnInit } from '@angular/core';
import { TaskMangerClientApi } from '../../services/task-manager-client/task-manger-client.api';
import { IRoomOptions } from '../../services/task-manager-client/endpoints/videocall.endpoints';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.component.html',
  styleUrls: ['./videocall.component.scss'],
})
export class VideocallComponent implements OnInit {
  rooms: any = [];
  constructor(
    private readonly api: TaskMangerClientApi,
    private readonly auth: AuthService
  ) {}

  ngOnInit(): void {}

  async createRoom(
    roomOptions: IRoomOptions,
    members: { name: string; email: string }[]
  ) {
    const me = (await this.auth.getCurrentUser()).username;
    members.push({ email: me, name: me });
    const res = await this.api.videoCall.create({
      room: {
        ...roomOptions,
        properties: {
          enable_chat: true,
          enable_screenshare: true,
        },
      },
      members: members,
    });
    this.rooms.push(res);
  }
}
