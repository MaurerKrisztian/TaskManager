import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) {
  }

  static isAuth(): boolean {
    return (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null);
  }

  getCurrentUser(): Observable<any> {
    return this.api.get('user/' + localStorage.getItem('userId'));
  }

  static getLocalStorageElement(element: string): string {
    return localStorage[element];
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  static getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  static logout(): void {
    localStorage.removeItem('login');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

}
