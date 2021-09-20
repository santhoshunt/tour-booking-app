/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay, map, take, tap } from 'rxjs/operators';

import { AuthService } from './../auth/auth.service';
import { Place } from './places.model';
@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([
    {
      id: 'p1',
      title: 'Kodaikanal',
      description: 'Queen of hills',
      imageUrl:
        'https://static.toiimg.com/photo/msid-78034444,width-96,height-65.cms',
      price: 15000,
      fromDate: new Date('2021-12-31'),
      toDate: new Date('2022-12-31'),
      userId: 'u1',
    },
    {
      id: 'p2',
      title: 'Madurai',
      description: 'Thoonga Nagaram ',
      imageUrl:
        'https://www.literarytraveler.com/wp-content/uploads/2021/03/shutterstock_190831037-scaled.jpg',
      price: 10000,
      fromDate: new Date('2021-12-31'),
      toDate: new Date('2022-12-31'),
      userId: 'u1 ',
    },
    {
      id: 'p3',
      title: 'Chennai',
      description: 'Capital of Tamil Nadu',
      imageUrl:
        // eslint-disable-next-line max-len
        'https://cw-gbl-gws-prod.azureedge.net/-/media/cw/apac/india/offices/chennai-storyheader-mobile.jpg?rev=6cff79a969104916aedad5068ccb8575',
      price: 7800,
      fromDate: new Date('2021-12-31'),
      toDate: new Date('2022-12-31'),
      userId: 'u1',
    },
  ]);

  constructor(private authService: AuthService) {}

  get places() {
    return this._places.asObservable();
  }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => ({ ...places.find((p) => p.id === id) }))
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      title,
      Math.random().toString(),
      description,
      'https://upload.wikimedia.org/wikipedia/commons/d/dc/No_Preview_image_2.png',
      price,
      dateFrom,
      dateTo,
      this.authService.getUserId()
    );
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updateOffer(
    placeId: string,
    title: string,
    description: string,
    price: number
  ) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places: Place[]) => {
        const updatedPlaceIndex = places.findIndex((p) => p.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          title,
          oldPlace.id,
          description,
          oldPlace.imageUrl,
          price,
          oldPlace.fromDate,
          oldPlace.toDate,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}
