import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-single-hero',
  templateUrl: './single-hero.component.html',
  styleUrls: ['./single-hero.component.css'],
  providers: [HeroService]
})
export class SingleHeroComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
  }

  delete() {
      this.heroService.deleteHero(this.hero.id).subscribe(hero => console.log(hero));
  }

}
