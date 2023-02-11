import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header />
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'rickandmorty';
}
