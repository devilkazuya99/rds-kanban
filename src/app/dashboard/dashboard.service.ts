import { Injectable } from "@angular/core";
import { DashboardMiddleware } from "./dashboard.middleware";
import { Board } from "../model/base.model";
import { generateId } from "../utils/common.utils";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private middleware: DashboardMiddleware) { }

    getAllBoards() {
        return this.middleware.getAllBoards();
    }

    addNewBoard(newBoardName: string) {
        const newBoard: Board = {
            id: generateId(),
            name: newBoardName,
            stages: [
                {
                    id: generateId(),
                    label: 'TODO',
                    cards: []
                },
                {
                    id: generateId(),
                    label: 'IN PROGRESS',
                    cards: []
                },
                {
                    id: generateId(),
                    label: 'DONE',
                    cards: []
                },
            ]
        };
        return this.middleware.addNewBoard(newBoard);
    }

    deleteBoard(id: number) {
        return this.middleware.deleteBoard(id);
    }

}