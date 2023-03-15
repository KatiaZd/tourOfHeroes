import { Component, OnInit } from '@angular/core';
import { Hero } from '../../hero';
import { HeroService } from '../../services/hero/hero.service';
// import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
    // Déclaration de la propriété selectedHero
    heroes: Hero[] = [];
    
    constructor(private heroService: HeroService) {}

    // Gestion du clic sur un héro
    // En réponse à un événement de clic, appelez le gestionnaire de clic du composant, add(), puis effacez le champ de saisie afin qu'il soit prêt pour un autre nom.
    add(name: string): void {
      name = name.trim();
      if (!name) { return; }
      this.heroService.addHero({ name } as Hero)
        .subscribe(hero => {
          this.heroes.push(hero);
        });
    }

    // Méthode appelée au chargement du composant, récupération des héros
    ngOnInit(): void {
      this.getHeroes();
    }

    // Observable : méthode appelée au chargement du composant, récupération des héros
    getHeroes(): void {
      this.heroService.getHeroes()
          .subscribe(heroes => this.heroes = heroes);
    }

  }


    // Déclaration de la propriété selectedHero
    // selectedHero?: Hero;

    // Gestion du clic sur un héro
    //   onSelect(hero: Hero): void {
    //     this.selectedHero = hero;
    //     this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
    // }


    // Méthode appelée au chargement du composant, récupération des héros - Mauvaise pratique !!
    // getHeroes(): void {
    //   this.heroes = this.heroService.getHeroes();
    // }

 

