import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {SuccessfulLoginResult} from "../../services/task-manager-client/endpoints/auth.endpoints";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @ts-ignore
  @ViewChild('loginLabel') loginEmail: ElementRef;

  loginError = '';
  registrationError = ''
  constructor(private api: ApiService, private readonly router: Router) {
  }

  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
        this.api.post('auth/login', {
          username: username,
          password: password
        }).toPromise().then(async (response: SuccessfulLoginResult) => {
          if (response.token !== undefined) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.username);
            localStorage.setItem('userId', response.userId);
            await this.router.navigate(['/taskboards']);
            resolve(response.token);
          } else {
            this.loginError = 'Wrong email / password'
            reject('wrong email / password');
          }

        }).catch((err) => {
          this.loginError = 'Wrong email / password'
          reject('wrong email / password');
        });
      }
    );
  }

  ngOnInit(): void {
  }

  async registration(username: string, password: string) {
    this.api.post('user/', {
      username: username,
      password: password
    }).toPromise().then(() => {
      this.loginEmail.nativeElement.click()
    }).catch((err) => {
      this.registrationError = 'Email is not available!';
    })
  }


}

