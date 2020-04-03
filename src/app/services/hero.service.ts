import { Injectable } from '@angular/core';

import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HEROES } from '../mocks/mock-heroes';
import { Hero } from '../hero';

@Injectable()
export class HeroService {

  constructor() { }

  getHeroes(): Observable<Array<Hero>> {
    return of(HEROES);
  }
}
