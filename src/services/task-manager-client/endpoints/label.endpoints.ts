import { RESTEndpoints } from '../services/REST.endpoints';
import { Injectable } from '@angular/core';

export interface ILabel {
  _id: string;
  name: string;
  description?: string;
  color: string;
  userId: string;
  createdAt?: Date;
}
@Injectable()
export class LabelEndpoints extends RESTEndpoints<ILabel> {
  endpoint = 'label';
}
