import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  logs: ILog[] = [];

  constructor(
    private readonly api: ApiService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async ngOnInit() {
    if (!(await this.authService.isAdmin())) {
      await this.router.navigate(['/login']);
    }

    this.logs =
      (await this.api.get('logs?type=login&limit=30').toPromise()) || [];
  }
}

export interface ILog {
  userId: any | string;

  type: string;

  content: any;
}
