import { Injectable } from '@angular/core';
import { TaskMangerClientApi } from './task-manager-client/task-manger-client.api';

export interface IUser {
  username: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: TaskMangerClientApi) {}

  static isAuth(): boolean {
    return (
      localStorage.getItem('token') !== undefined &&
      localStorage.getItem('token') !== null
    );
  }

  isAuth(): boolean {
    return (
      localStorage.getItem('token') !== undefined &&
      localStorage.getItem('token') !== null
    );
  }

  getCurrentUser() {
    // @ts-ignore
    return this.api.user.findById(localStorage.getItem('userId'));
  }

  async getCurrentUserRole() {
    const user: IUser = await this.getCurrentUser();
    return user.role;
  }

  async isAdmin() {
    const user: IUser = await this.getCurrentUser();
    return user.role == 'admin';
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
