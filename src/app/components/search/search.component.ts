import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="search">
      <input [value]="value" type="search" (input)="search($event)" placeholder="Search.." />
    </div>
  `,
  styles: [/*css*/`
    .search {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 20px;
      color: var(--primary-font);
    }
    input {
      border: solid 3px var(--secondary-bg);
      border-radius: 5px;
      padding: 5px;
      color: var(--primary-text);
      background-color: var(--primary-bg);
      width: 50%;
      font-size: 1.0rem;
    }
  `
  ]
})
export class SearchComponent {

  @Input() value: string = '';
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  search(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.onSearch.emit(element.value);
  }

}
