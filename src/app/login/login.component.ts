import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../serrvices/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService) {
  }

  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.api.post('api/auth/login', {
          username: username,
          password: password
        }).toPromise().then((response: SuccessfulLoginResult) => {
          if (response.token !== undefined) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.username);
            localStorage.setItem('userId', response.userId);
            resolve(response.token);
          } else {
            reject('wrong email / password');
          }

        }).catch((err) => {
          reject('wrong email / password');
        });
      }
    );
  }

  ngOnInit(): void {
  }

  async registration(username: string, password: string) {
    return await this.api.post('api/user/', {
      username: username,
      password: password
    }).toPromise()
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }
}

export interface SuccessfulLoginResult {
  token: string;
  username: string;
  userId: string;
}
