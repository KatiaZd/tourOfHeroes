import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../../hero';
import { HeroService } from '../../services/hero/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push un terme de recherche dans le flux observable
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // attendre 300 ms après chaque frappe avant de considérer le terme
      debounceTime(300),

      // ignorer le nouveau terme s'il est identique au terme précédent. Il garantie qu'une requête est envoyée uniquement si le texte du filtre a changé.
      distinctUntilChanged(),

      // passer à une nouvelle recherche observable à chaque fois que le terme change. switchMap appelle le service de recherche pour chaque terme de recherche qui passe
      // par debounceTime et distinctUntilChanged. Il annule et rejette les anciennes recherches en cours, retourne uniquement le dernier service de recherche observable et
      // transmet les résultats de ce service de recherche observable.
      switchMap((term: string) => this.heroService.searchHeroes(term)),

      // switchMap() préserve l'ordre des requêtes d'origine tout en renvoyant uniquement l'observable de l'appel de méthode HTTP le plus récent. Les résultats des appels précédents sont annulés et rejetés.
    );
  }
}
