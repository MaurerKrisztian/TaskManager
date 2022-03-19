import {Component} from '@angular/core';

import {AuthService} from "../services/auth.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }
}
