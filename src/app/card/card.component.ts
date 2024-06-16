import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Card } from '../model/base.model';
import { CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'rds-card',
  standalone: true,
  imports: [CdkDragPlaceholder, FormsModule, NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() card?: Card;
  @ViewChild('subjectTxt') searchElement?: ElementRef;

  editLabelMode = false;

  enableEdit() {
    this.editLabelMode = true;
    setTimeout(() => {
      if (this.searchElement) {
        this.searchElement.nativeElement.focus();
      }
    }, 300);
  }

  disableEidt() {
    this.editLabelMode = false;
  }
}
