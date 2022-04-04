import {RESTEndpoints} from "../services/REST.endpoints";
import {IBoard} from "../../../app/task-board/task-board.component";
import {Injectable} from "@angular/core";

@Injectable()
export class BoardEndpoints extends RESTEndpoints<IBoard> {
  endpoint: string = "taskboard";
}
