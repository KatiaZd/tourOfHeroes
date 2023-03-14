import { Injectable } from '@angular/core';
import { Hero } from '../../hero';
import { HEROES } from '../../mocks/mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from '../../services/message/message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  // of(HEROES) retourne un Observable<Hero[]> qui émet une seule valeur, le tableau de héros mockés.
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');     // Ajoute un message à la liste des messages lorsque les héros sont récupérés
    return heroes;
  }

  

}
