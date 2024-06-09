import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Board } from '../model/base.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { generateId } from '../utils/common.utils';
import { DashboardService } from './dashboard.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'rds-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  newBoardName: string = '';
  boards: Board[] = [];

  constructor(private service: DashboardService) { }

  loadAllBoards() {
    this.service.getAllBoards().subscribe({
      next: (boards: Board[]) => {
        console.log('boards =', boards);
        this.boards = boards;
      }
    });
  }

  ngOnInit(): void {
    this.loadAllBoards();
  }

  addNewBoard() {
    console.log('addNewBoard()');
    if (this.newBoardName) {
      this.service.addNewBoard(this.newBoardName).subscribe({
        error: err => {
          console.log('ERROR', err);
        },
        complete: () => {
          console.log('Done. Reload all boards.');
          this.loadAllBoards();
        }
      });
      this.newBoardName = '';
      console.log(this.boards);
    }
  }
}
