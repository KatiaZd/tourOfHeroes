import { Component, Input } from '@angular/core';
import { Hero } from '../../hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../services/hero/hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent {
  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  // Sert à récupérer l'ID du héros à afficher
  ngOnInit(): void {
    this.getHero();
  }
  
  // Sert à retourner à la page précédente
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  // Sert à retourner à la page précédente
  goBack(): void {
    this.location.back();
  }

}
