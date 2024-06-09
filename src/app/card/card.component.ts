import { Component, Input } from '@angular/core';
import { Card } from '../model/base.model';
import { CdkDragPlaceholder } from '@angular/cdk/drag-drop';

@Component({
  selector: 'rds-card',
  standalone: true,
  imports: [CdkDragPlaceholder],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() card?: Card;
}
