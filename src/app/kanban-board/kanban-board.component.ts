import { Component, Input } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
  CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { Board, Card, Stage } from '../model/base.model';
import { KanbanBoardService } from './kanban-board.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'rds-kanban-board',
  standalone: true,
  imports: [CdkDrag, CdkDropList, CdkDragPlaceholder, CommonModule, FormsModule, JsonPipe, CardComponent, RouterLink],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent {

  constructor(private service: KanbanBoardService) { }

  loadBoard(id: number) {
    this.service.getBoard(id).subscribe({
      next: board => {
        console.log('Board: ', board);
        this.board = board;
        const arr = this.board.stages?.flatMap((stg) => {
          return stg.cards.flatMap((card) => { return card.id; });
        });
        if (arr) {
          console.log('arr max =', Math.max(...arr));
          this.cardNo = Math.max(...arr);
        }
        this.cardListIds = (this.board.stages?.map(stg => `stage-${stg.id}-card-list`)) || [];
      }
    });
  }

  @Input()
  set id(id: number) {
    this.loadBoard(id);
  }

  board?: Board;
  stageNo = 0;
  cardNo = 0;
  cardListIds: string[] = [];

  private createNewStage(label?: string) {
    const cards: Card[] = [];
    for (let i = 0; i < 3; i++) {
      cards.push({ id: ++this.cardNo, subject: 'Card ' + this.cardNo });
    }
    const cardListId = ++this.stageNo;
    this.cardListIds.push(`stage-${cardListId}-card-list`);
    return { id: cardListId, label: label || 'New_Stage', cards } as Stage;
  }

  addStage() {
    this.board?.stages?.push(this.createNewStage());
  }

  saveBoard() {
    if (this.board) {
      const boardId = this.board.id;
      this.service.saveBoard(this.board).subscribe({
        next: () => {
          console.log('Save board successfully.');
          this.loadBoard(boardId);
        }
      });
    }
  }

  addCard(stageId: number) {
    if (this.board && this.board.stages) {
      this.board.stages.forEach(stage => {
        if (stage.id === stageId) {
          console.log(`Adding new card to stage: ${stageId}`);
          stage.cards.push({ id: ++this.cardNo, subject: 'Card ' + this.cardNo });
        }
      });
      console.log(`Saving board: ${this.board.id}`);
      this.saveBoard();
    }
  }

  drop(event: CdkDragDrop<Stage[]>) {
    if (this.board && this.board.stages) {
      moveItemInArray(this.board.stages, event.previousIndex, event.currentIndex);
      this.saveBoard();
    }
  }

  dropCard(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.saveBoard();
  }

  changeLabel(id: number, label: string) {
    console.log(id, ':', label);
    this.saveBoard();
  }
}
