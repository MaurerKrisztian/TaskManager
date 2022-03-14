import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  static ENDPOINTS = {
    boards: 'taskboard',
    tasks: 'task',
    login: 'task',
  };

  // HOST = 'http://localhost:3000/';
  HOST = 'https://taskmanager-mk.herokuapp.com/';


  get(endpoint: string): Observable<any> {
    return this.http.get(this.HOST + endpoint);
  }

  post(endpoint: string, data: any, options?: any): Observable<any> {
    return this.http.post(this.HOST + endpoint, data, options);
  }

  put(endpoint: string, data: any): Observable<any> {
    return this.http.put(this.HOST + endpoint, data);
  }

  del(endpoint: string): Observable<any> {
    return this.http.delete(this.HOST + endpoint);
  }

  patch(endpoint: string, body: any): Observable<any> {
    return this.http.patch(this.HOST + endpoint, body);
  }
}
