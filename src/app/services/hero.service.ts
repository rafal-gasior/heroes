import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HEROES } from '../mocks/mock-heroes';
import { Hero } from '../hero';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
   'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
/*    'key': 'x-api-key',
    'value': 'NNctr6Tjrw9794gFXf3fi6zWBZ78j6Gv3UCb3y0x',*/
  })
};

@Injectable()
export class HeroService {

  private heroesUrl = 'http://localhost:8080/api/v1/heroes/';

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Array<Hero>> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => console.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Array<Hero>> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero[]>(url).pipe(
      tap(_ => console.log('fetched hero')),
      catchError(this.handleError<Hero[]>('getHero', []))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
            tap(_ => console.log(_)),
        catchError(this.handleError('addHero', hero))
      );
  }

  updateHero (id: number, hero: Hero): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.put<Hero>(url, hero, httpOptions)
    .pipe(
      catchError(this.handleError('updateHero', hero))
    );
  }

  deleteHero(id): Observable<{}> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, httpOptions)
      .pipe(
          tap(_ => console.log(_)),
        catchError(this.handleError('deleteHero'))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
