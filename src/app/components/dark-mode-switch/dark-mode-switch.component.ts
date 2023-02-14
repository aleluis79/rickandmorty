import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchComponent } from '../switch/switch.component';

@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [CommonModule, SwitchComponent],
  template: `
      <app-switch (change)="change($event)" [checked]="darkMode" />
  `,
  styles: [
  ]
})
export class DarkModeSwitchComponent {

  darkMode: boolean;

  constructor() {
    this.darkMode = localStorage.getItem("darkMode") === "true";
    if (this.darkMode) {
      document.querySelector('body')?.classList.add('darkMode');
    }
  }

  change(e: any): void {
    const checked = e.target.checked;
    console.log("paso por aca");
    if (checked) {
      document.querySelector('body')?.classList.add('darkMode');
    } else {
      document.querySelector('body')?.classList.remove('darkMode');
    }
    localStorage.setItem("darkMode", checked);
  }

}
