import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character, CharacterService } from '../../services/character.service';
import { Observable, of } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="character-container">
      <div class="character-card" *ngFor="let character of this.characters$ | async">
        <p>{{character.name}}</p>
        <a [routerLink]="['/character/' + character.id]">
          <img src="{{character.image}}" />
        </a>
      </div>
    </div>
  `,
  styles: [
  `
    .character-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 5px;
    }

    .character-card {
      min-width: 200px;
      height: 250px;
      background-color: snow;
      border: solid 2px gray;
      color: black;
      text-align: center;

      & img {
        max-width: 150px;
      }
    }
  `
  ]
})
export class CharacterListComponent implements OnInit {

  constructor(private readonly service: CharacterService) { }

  characters$: Observable<Character[]> | undefined;

  ngOnInit(): void {
    this.characters$ = this.service.getCharacters();
  }

}
