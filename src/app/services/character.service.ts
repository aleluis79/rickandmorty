import { HttpClient, HttpBackend } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private http: HttpClient;

  private httpLoading: HttpClient;

  constructor() {
    this.http = new HttpClient(inject(HttpBackend));
    this.httpLoading = inject(HttpClient);
  }

  getCharacters(page: number = 1): Observable<Character[]> {
    return this.httpLoading.get<RickAndMortyResponse>(`https://rickandmortyapi.com/api/character?page=${page}`).pipe(
      map(data => data.results)
    );
  }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`https://rickandmortyapi.com/api/character/${id}`);
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

