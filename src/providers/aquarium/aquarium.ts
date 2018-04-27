import { Aquarium } from '../../models/aquarium';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
//TODO A supprimer quand on fera du call à l'API.
import 'rxjs/add/observable/of';

@Injectable()
export class AquariumProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AquariumProvider Provider');
  }

  public getAquarium(): Observable<Aquarium> {
    const initAquarium: Aquarium = {
      feedRemotly: true,
      lastMealAt: new Date('4/27/2008 10:52:10'),
      remainingQuantity: 3,
      waterChangedAt: new Date('4/27/2014 10:52:10'),
      todo: "Acheter du pousses",
      feedEveryDay: true,
    };

    console.log(initAquarium);
    return Observable.of(initAquarium);
  }
}
