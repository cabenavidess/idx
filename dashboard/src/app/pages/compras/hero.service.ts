import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { Hero } from './data-model';
import { Http, Headers } from '@angular/http';
import { GlobalService } from '../../services/global.service';

@Injectable()
export class HeroService {
  headers;
  ruta: string;

  constructor(
    private _http: Http,
    private _gs: GlobalService
  ) {
    this.ruta = this._gs.urlGlobalService + '/facturacion/guardafactura';
  }
  delayMs = 500;

  // Fake server get; assume nothing can go wrong
  // getHeroes(): Observable<Hero[]> {
  //   return of(heroes).delay(this.delayMs); // simulate latency with delay
  // }

  private getHeaders(): Headers {
    return new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
  }
  // Fake server update; assume nothing can go wrong
  updateHero(hero: Hero): Observable<Hero> {
    // const oldHero = heroes.find(h => h.id === hero.id);
    const newHero = Object.assign(hero); // Demo: mutate cached hero
    return of(newHero).delay(this.delayMs); // simulate latency with delay
  }

  saveHero(hero: Hero): Observable<Hero> {
    let data = new URLSearchParams();
    let headers = this.getHeaders()
    data.append("compra", JSON.stringify(hero));

    return this._http.post(this.ruta, data, {
      headers: headers
    })
      .map(response => response.json())
      .map((response) => {
        return response;
      })

  }
}