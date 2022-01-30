import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiService) {
  }

  isAuth(): boolean {
    return (localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== null);
  }

  getCurrentUser(): Observable<any> {
    return this.api.get('user/' + localStorage.getItem('userId'));
  }

  getLocalStorageElement(element: string): string {
    return localStorage[element];
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  logout(): void {
    localStorage.removeItem('login');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

}
