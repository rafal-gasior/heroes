import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})
export class HeroesComponent implements OnInit {
//  @Input() hero: Hero;
  heroes: Array<Hero>;
  selectedHero: Hero;

  newHeroName: string;

  constructor(private heroService: HeroService) {

  }

  ngOnInit() {
      this.getHeroes();
  }


  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  addHero(newHero: Hero): void {
    this.heroService.addHero(newHero).subscribe(hero => this.heroes.push(hero));
  }

  onSubmit(data) {
    console.log('submit ' + data.name);
    this.addHero({id: 22, name: data.name });
  }
}
