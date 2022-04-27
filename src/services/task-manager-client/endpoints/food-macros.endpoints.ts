import { RESTEndpoints } from '../services/REST.endpoints';
import { Injectable } from '@angular/core';

export interface IFoodMacros {
  _id?: string;
  userId: string;
  date: Date;
  createdAt?: Date;
  protein: number;
  carbohydrates: number;
  fat: number;
}

@Injectable()
export class FoodMacrosEndpoints extends RESTEndpoints<IFoodMacros> {
  endpoint = 'food-macros';
}
