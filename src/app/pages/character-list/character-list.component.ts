import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Character, CharacterService } from '../../services/character.service';
import { Observable, of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from "../../components/paginator/paginator.component";

@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginatorComponent],
  template: `
    <div class="character-container">
      <div class="character-card" *ngFor="let character of this.characters$ | async">
        <p>{{character.name}}</p>
        <a [routerLink]="['/character/' + character.id]">
          <img src="{{character.image}}" />
        </a>
      </div>
    </div>
    <br />
    <app-paginator [current]="this.current" (change)="goto($event)" />
  `,
  styles: [
  /*css*/`
    .character-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, 200px);
      grid-auto-rows: 250px;
      grid-gap: 20px;
      justify-content: center;
    }

    .character-card {
      background-color: blueviolet;
      border: solid 3px blueviolet;
      color: snow;
      text-align: center;

      & img {
        max-width: 100%;
      }
    }
  `
  ]
})
export class CharacterListComponent implements OnInit {

  current = 1;

  constructor(private readonly service: CharacterService) {}

  characters$: Observable<Character[]> | undefined;

  ngOnInit(): void {
    const currentPage = localStorage.getItem("current") || this.current;
    this.current = +currentPage;
    this.characters$ = this.service.getCharacters(this.current);
  }

  goto(page: number) : void {
    if (page < 1) {
      page = 1;
      return;
    } else if (page > 42) {
      page=42;
      return;
    }

    this.current = page;
    localStorage.setItem("current", this.current.toString());
    this.characters$ = this.service.getCharacters(this.current);
  }

}
