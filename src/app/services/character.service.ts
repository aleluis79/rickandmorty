import { HttpClient, HttpBackend } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private readonly baseUrl = 'https://rickandmortyapi.com/api/character';

  private http: HttpClient;

  private httpLoading: HttpClient;

  constructor() {
    this.http = new HttpClient(inject(HttpBackend));
    this.httpLoading = inject(HttpClient);
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.baseUrl}/${id}`);
  }

  searchCharacters(searchTerm: string, page: number): Observable<RickAndMortyResponse> {
    const empty: RickAndMortyResponse = {
      info: {
        count: 0,
        pages: 0,
        next: '',
        prev: null
      },
      results: []
    }
    if (searchTerm.length < 3) {
      return of(empty);
    }
    return this.http.get<RickAndMortyResponse>(`${this.baseUrl}?name=${searchTerm}&page=${page}`).pipe(
      catchError(() => {
        return of(empty);
      })
    )
  }


}

export interface RickAndMortyResponse {
  info:    Info;
  results: Character[];
}

export interface Info {
  count: number;
  pages: number;
  next:  string;
  prev:  null;
}

export interface Character {
  id:       number;
  name:     string;
  status:   Status;
  species:  Species;
  type:     string;
  gender:   Gender;
  origin:   Location;
  location: Location;
  image:    string;
  episode:  string[];
  url:      string;
  created:  Date;
}

export enum Gender {
  Female = "Female",
  Male = "Male",
  Unknown = "unknown",
}

export interface Location {
  name: string;
  url:  string;
}

export enum Species {
  Alien = "Alien",
  Human = "Human",
}

export enum Status {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}

