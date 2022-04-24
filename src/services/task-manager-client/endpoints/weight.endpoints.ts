import { RESTEndpoints } from '../services/REST.endpoints';
import { Injectable } from '@angular/core';

export interface IWeight {
  _id: string;
  userId: string;
  date: Date;
  weight: number;
  createdAt?: Date;
}
@Injectable()
export class WeightEndpoints extends RESTEndpoints<IWeight> {
  endpoint = 'weight';
}
