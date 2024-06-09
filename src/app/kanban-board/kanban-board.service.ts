import { Injectable } from "@angular/core";
import { Board } from "../model/base.model";
import { KanbanBoardMiddleware } from "./kanban-board.middleware";

@Injectable({
    providedIn: 'root'
})
export class KanbanBoardService {

    constructor(private middleware: KanbanBoardMiddleware) { }

    getBoard(id: number) {
        return this.middleware.getBoard(id);
    }

    saveBoard(board: Board) {
        return this.middleware.saveBoard(board);
    }
}