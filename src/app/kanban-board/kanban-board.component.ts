import { Component } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Card {
  id: number;
  subject: string;
}
interface Stage {
  id: number;
  label: string;
  cards: Card[];
}

@Component({
  selector: 'rds-kanban-board',
  standalone: true,
  imports: [CdkDrag, CdkDropList, CommonModule, FormsModule, JsonPipe],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent {
  stageNo = 0;
  cardNo = 0;
  cardListIds: string[] = [];
  stages: Stage[] = [
    this.createNewStage('TODO'),
    this.createNewStage('In Progress'),
    this.createNewStage('Done'),
  ];

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
    this.stages.push(this.createNewStage());
  }

  drop(event: CdkDragDrop<Stage[]>) {
    moveItemInArray(this.stages, event.previousIndex, event.currentIndex);
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
  }
}
