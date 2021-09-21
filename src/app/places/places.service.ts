/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay, map, take, tap, switchMap } from 'rxjs/operators';

import { AuthService } from './../auth/auth.service';
import { Place } from './places.model';

interface PlaceData {
  description: string;
  fromDate: string;
  imageUrl: string;
  price: number;
  title: string;
  toDate: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) {}

  get places() {
    return this._places.asObservable();
  }

  getPlace(id: string) {
    return this.places.pipe(
      take(1),
      map((places) => ({ ...places.find((p) => p.id === id) }))
    );
  }

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: PlaceData }>(
        'https://booking-18946-default-rtdb.firebaseio.com/offered-places.json'
      )
      .pipe(
        map((resData) => {
          const places: Place[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  resData[key].title,
                  key,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  new Date(resData[key].fromDate),
                  new Date(resData[key].toDate),
                  resData[key].userId
                )
              );
            }
          }
          // return [];
          return places;
        }),
        tap((places) => {
          this._places.next(places);
        })
      );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    let generatedId: string;
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
    return this.http
      .post<{ name: string }>(
        'https://booking-18946-default-rtdb.firebaseio.com/offered-places.json',
        { ...newPlace, id: null }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap((places) => {
          newPlace.id = generatedId;
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

// {
//   id: 'p1',
//   title: 'Kodaikanal',
//   description: 'Queen of hills',
//   imageUrl:
//     'https://static.toiimg.com/photo/msid-78034444,width-96,height-65.cms',
//   price: 15000,
//   fromDate: new Date('2021-12-31'),
//   toDate: new Date('2022-12-31'),
//   userId: 'u1',
// },
// {
//   id: 'p2',
//   title: 'Madurai',
//   description: 'Thoonga Nagaram ',
//   imageUrl:
//     'https://www.literarytraveler.com/wp-content/uploads/2021/03/shutterstock_190831037-scaled.jpg',
//   price: 10000,
//   fromDate: new Date('2021-12-31'),
//   toDate: new Date('2022-12-31'),
//   userId: 'u1 ',
// },
// {
//   id: 'p3',
//   title: 'Chennai',
//   description: 'Capital of Tamil Nadu',
//   imageUrl:
//     // eslint-disable-next-line max-len
//     'https://cw-gbl-gws-prod.azureedge.net/-/media/cw/apac/india/offices/chennai-storyheader-mobile.jpg?rev=6cff79a969104916aedad5068ccb8575',
//   price: 7800,
//   fromDate: new Date('2021-12-31'),
//   toDate: new Date('2022-12-31'),
//   userId: 'u1',
// },
