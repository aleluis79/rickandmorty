import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeSwitchComponent } from '../dark-mode-switch/dark-mode-switch.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DarkModeSwitchComponent],
  template: `
    <div class="container">
      🐛 Rick and Morty
      <div class="switch">☀️<app-dark-mode />🌙</div>
    </div>
  `,
  styles: [
    /*css*/`
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        padding: 20px;
        color: var(--primary-font);
      }

      .switch {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `
  ]
})
export class HeaderComponent {

}
