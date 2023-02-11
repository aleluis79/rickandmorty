import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Character, CharacterService } from 'src/app/services/character.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div *ngIf="character$ | async as character; else elseBlock">
      <h3>{{character.name}}</h3>
      <div>
        Specie: {{character.species}}<br />
        Location: {{character.location.name}}<br />
        Gender: {{character.gender}}<br />
      </div>
      <div>
        <img src="{{character.image}}" />
      </div>
      <button [routerLink]="['/character']">Back</button>
    </div>
    <ng-template #elseBlock>Loading character</ng-template>
  `,
  styles: [
  ]
})
export class CharacterDetailComponent implements OnInit {
  id?: number;

  character$: Observable<Character> | undefined;

  constructor(private route: ActivatedRoute, private readonly service: CharacterService) {
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.character$ = this.service.getCharacter(this.id);
  }

}
