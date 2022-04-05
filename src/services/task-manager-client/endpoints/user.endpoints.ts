import { RESTEndpoints } from '../services/REST.endpoints';
import { IUser } from '../../auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class UserEndpoints extends RESTEndpoints<IUser> {
  endpoint = 'user';
}
