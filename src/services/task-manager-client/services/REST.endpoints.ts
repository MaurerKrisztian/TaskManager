import {ApiService} from "../../api.service";
import {Injectable} from "@angular/core";

@Injectable()
export abstract class RESTEndpoints<Entity> {
  abstract endpoint: string;

  constructor(readonly api: ApiService) {
  }

  create(data: Partial<Entity>): Promise<Entity> {
    return this.api.post(this.endpoint, data).toPromise()
  }

  findById(id: string): Promise<Entity> {
    return this.api.get(`${this.endpoint}/${id}`).toPromise()
  }

  getAll(): Promise<Entity[]> {
    return this.api.get(this.endpoint).toPromise()
  }

  deleteById(id: string): Promise<Entity> {
    return this.api.del(`${this.endpoint}/${id}`).toPromise()
  }

  update(id: string, update: any): Promise<Entity> {
    return this.api.patch(`${this.endpoint}/${id}`, update).toPromise()
  }
}
