import { AfterContentChecked, ChangeDetectorRef, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <app-header />
      <ng-container *ngIf="loading$ | async">CARGANDO...</ng-container>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
  ]
})
export class AppComponent implements AfterContentChecked {

  title = 'rickandmorty';

  loading$ : Observable<Boolean> | undefined;

  constructor(
    private readonly service: LoadingService,
    private changeDetector: ChangeDetectorRef) {
    this.loading$ = this.service.isLoading$;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

}
