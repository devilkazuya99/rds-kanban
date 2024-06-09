import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Board } from "../model/base.model";
import { map, mergeAll } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class KanbanBoardMiddleware {
    constructor(private http: HttpClient) { }

    getBoard(id: number) {
        return this.http.get<Board>(`/svc/boards/${id}`);
    }

    saveBoard(board: Board) {
        return this.http.patch(`/svc/boards/${board.id}`, { ...board });
    }
}