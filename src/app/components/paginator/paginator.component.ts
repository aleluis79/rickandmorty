import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="paginator">
      <button (click)="goto(current-1)">Previous</button>{{current}} / {{total}}<button (click)="goto(current+1)">Next</button>
    </div>
  `,
  styles: [
    /*css*/`
    .paginator {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      color: var(--primary-font);
    }
    `
  ]
})
export class PaginatorComponent {

  @Input() current: number = 1;
  @Input() total: number = 0;

  @Output('change') changeEvent = new EventEmitter<number>();

  goto(page: number): void {
    this.changeEvent.emit(page);
  }

}
