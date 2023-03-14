import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent {

    // Déclaration de la propriété selectedHero
    selectedHero?: Hero;

    // Déclaration de la propriété selectedHero
    heroes: Hero[] = [];
    
    constructor(private heroService: HeroService) {}

    // Observable : méthode appelée au chargement du composant, récupération des héros
    getHeroes(): void {
      this.heroService.getHeroes()
          .subscribe(heroes => this.heroes = heroes);
    }

    // Méthode appelée au chargement du composant, récupération des héros
    ngOnInit(): void {
      this.getHeroes();
    }

      // Méthode appelée au chargement du composant, récupération des héros - Mauvaise pratique !!
    // getHeroes(): void {
    //   this.heroes = this.heroService.getHeroes();
    // }

    
    // Gestion du clic sur un héro
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

  }

