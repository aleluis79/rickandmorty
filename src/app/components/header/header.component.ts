import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      🐛 Rick and Morty 🧔
    </p>
  `,
  styles: [
    `
      p {
        text-align: center;
      }
    `
  ]
})
export class HeaderComponent {

}
