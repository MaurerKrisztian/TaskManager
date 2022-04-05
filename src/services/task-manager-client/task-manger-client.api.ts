import { ApiService } from '../api.service';
import { Injectable } from '@angular/core';
import { BoardEndpoints } from './endpoints/board.endpoints';
import { UserEndpoints } from './endpoints/user.endpoints';
import { TaskEndpoints } from './endpoints/task.endpoints';
import { AuthEndpoints } from './endpoints/auth.endpoints';
import { FileEndpoints } from './endpoints/file.endpoints';
import { WorkedtimeEndpoints } from './endpoints/workedtime.endpoints';
import { EmailEndpoints } from './endpoints/email.endpoints';

//todo
@Injectable()
export class TaskMangerClientApi {
  constructor(
    private readonly api: ApiService,
    readonly board: BoardEndpoints,
    readonly user: UserEndpoints,
    readonly task: TaskEndpoints,
    readonly file: FileEndpoints,
    readonly email: EmailEndpoints,
    readonly workedTimes: WorkedtimeEndpoints,
    readonly auth: AuthEndpoints
  ) {}
}
