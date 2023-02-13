import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule],
  template: /*html*/`
    <div class="container">
      <h1>Resource not found<span>404</span></h1>
      <p>The requested resource could not be found but may be available again in the future.</p>
    </div>
  `,
  styles: [
    /*css*/`
      .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin-top: 200px;
      }

      .container h1 span {
        font-size: 22px;
        color: gray;
        margin-left: 10px;
      }
    `
  ]
})
export class PageNotFoundComponent {

}
