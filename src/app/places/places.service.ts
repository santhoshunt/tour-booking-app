import { Place } from './places.model';
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    {
      id: 'p1',
      name: 'Kodaikanal',
      description: 'Queen of hills',
      imageUrl:
        'https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/02/winter-3.jpg',
      price: 15000,
      fromDate: new Date('2021-12-31'),
      toDate: new Date('2022-12-31'),
      userId: 'u1',
    },
    {
      id: 'p2',
      name: 'Madurai',
      description: 'Thoonga Nagaram ',
      imageUrl:
        'https://www.literarytraveler.com/wp-content/uploads/2021/03/shutterstock_190831037-scaled.jpg',
      price: 10000,
      fromDate: new Date('2021-12-31'),
      toDate: new Date('2022-12-31'),
      userId: 'u2',
    },
    {
      id: 'p3',
      name: 'Chennai',
      description: 'Capital of Tamil Nadu',
      imageUrl:
        // eslint-disable-next-line max-len
        'https://cw-gbl-gws-prod.azureedge.net/-/media/cw/apac/india/offices/chennai-storyheader-mobile.jpg?rev=6cff79a969104916aedad5068ccb8575',
      price: 7800,
      fromDate: new Date('2021-12-31'),
      toDate: new Date('2022-12-31'),
      userId: 'u1',
    },
  ];

  constructor() {}

  get places() {
    return [...this._places];
  }

  getPlace(id: string): Place {
    return {
      ...this._places.find((p) => {
        if (p.id === id) {
          return true;
        }
        return false;
      }),
    };
  }
}
