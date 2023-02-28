import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Character, CharacterService, RickAndMortyResponse } from '../../services/character.service';
import { debounceTime, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from "../../components/paginator/paginator.component";
import { SearchComponent } from 'src/app/components/search/search.component';
@Component({
  selector: 'app-character-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginatorComponent, SearchComponent, NgOptimizedImage],
  template: `
    <div class="character-list">
      <app-search [value]="this.term" (onSearch)="search($event)" />
      <div class="character-container">
        <div class="character-card" *ngFor="let character of this.characters$ | async">
          <p>{{character.name}}</p>
          <a [routerLink]="['/character/' + character.id]">
            <img [ngSrc]="character.image" width="200" height="195" />
          </a>
        </div>
      </div>
      <br />
      <app-paginator [current]="this.current" [total]="this.total" (change)="goto($event)" />
    </div>
  `,
  styles: [
  /*css*/`
    .character-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, 200px);
      grid-auto-rows: 220px;
      grid-gap: 20px;
      justify-content: center;
    }

    .character-card {
      background-color: var(--secondary-bg);
      border: solid 3px var(--secondary-bg);
      color: var(--secondary-font);
      text-align: center;
      transition: all 0.2s;

      & img {
        max-width: 100%;
      }

      & p {
        font-size: 14px;
        font-weight: bold;
        height: 20px;
        margin: 0;
      }
    }

    .character-card:hover {
      transform: scale(1.05) rotate(5deg);
    }
  `
  ]
})
export class CharacterListComponent implements OnInit, AfterViewInit {

  current = 1;

  total = 0;

  term = '';

  constructor(private readonly service: CharacterService) {}

  ngAfterViewInit(): void {
    this.search$.next(this.term);
  }

  characters$: Observable<Character[]> | undefined;

  search$ = new Subject<string>();

  ngOnInit(): void {
    const currentPage = localStorage.getItem("current") || this.current;
    this.current = +currentPage;
    this.term = localStorage.getItem("term") || '';
    this.characters$ = this.search$.pipe(
      debounceTime(500),
      tap((term: string) => this.term = term),
      switchMap((term: string) => this.service.searchCharacters(term, this.current)),
      tap((response: RickAndMortyResponse) => {
        this.total = response.info.pages;
      }),
      map((response: RickAndMortyResponse) => response.results)
    );

  }

  search(text: string): void {
    this.search$.next(text);
    this.current = 1;
    localStorage.setItem("term", text);
    localStorage.setItem("current", this.current.toString());
  }

  goto(page: number) : void {
    if (page < 1) {
      page = 1;
      return;
    } else if (page > this.total) {
      page=this.total;
      return;
    }

    this.current = page;
    localStorage.setItem("current", this.current.toString());
    localStorage.setItem("term", this.term);

    this.search$.next(this.term);

  }

}
