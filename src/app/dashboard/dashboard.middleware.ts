import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Board } from "../model/base.model";

@Injectable({
    providedIn: 'root'
})
export class DashboardMiddleware {
    constructor(private http: HttpClient) { }

    addNewBoard(newBoard: Board) {
        return this.http.post(`/svc/boards`, { ...newBoard });
    }

    getAllBoards() {
        return this.http.get<Board[]>('/svc/boards');
    }

    deleteBoard(id: number) {
        return this.http.delete(`/svc/boards/${id}`);
    }

}