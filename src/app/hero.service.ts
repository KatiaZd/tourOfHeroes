import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  // of(HEROES) retourne un Observable<Hero[]> qui émet une seule valeur, le tableau de héros mockés.
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }

}
