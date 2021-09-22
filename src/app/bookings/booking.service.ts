/* eslint-disable arrow-body-style */
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Booking } from './booking.model';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { delay, take, tap, switchMap, map } from 'rxjs/operators';

interface BookingData {
  bookedFrom: string;
  bookedTo: string;
  firstName: string;
  guestNumber: number;
  imageUrl: string;
  lastName: string;
  placeId: string;
  placeTitle: string;
  userId: string;
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings = new BehaviorSubject<Booking[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) {}

  getBookings() {
    return this.bookings.asObservable();
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    firstName: string,
    lastName: string,
    dateFrom: Date,
    dateTo: Date,
    guestNumber: number,
    placeImage: string
  ) {
    const newBooking = new Booking(
      Math.random().toString(),
      placeId,
      this.authService.getUserId(),
      placeTitle,
      guestNumber,
      firstName,
      lastName,
      dateFrom,
      dateTo,
      placeImage
    );
    let generatedId: string;
    return this.http
      .post<{ name: string }>(
        'https://booking-18946-default-rtdb.firebaseio.com/bookings.json',
        {
          ...newBooking,
          id: null,
        }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.bookings;
        }),
        take(1),
        tap((bookings) => {
          newBooking.id = generatedId;
          this.bookings.next(bookings.concat(newBooking));
        })
      );
  }

  cancelBooking(id: string) {
    return this.http
      .delete(
        `https://booking-18946-default-rtdb.firebaseio.com/bookings/${id}.json`
      )
      .pipe(
        switchMap(() => {
          return this.bookings;
        }),
        take(1),
        tap((bookings) => {
          this.bookings.next(bookings.filter((b) => b.id !== id));
        })
      );
  }

  fetchBookings() {
    return this.http
      .get<{ [key: string]: BookingData }>(
        `https://booking-18946-default-rtdb.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.getUserId()}"`
      )
      .pipe(
        map((bookingData) => {
          const bookings = [];
          for (const key in bookingData) {
            if (bookingData.hasOwnProperty(key)) {
              bookings.push(
                new Booking(
                  key,
                  bookingData[key].placeId,
                  bookingData[key].userId,
                  bookingData[key].placeTitle,
                  bookingData[key].guestNumber,
                  bookingData[key].firstName,
                  bookingData[key].lastName,
                  new Date(bookingData[key].bookedFrom),
                  new Date(bookingData[key].bookedTo),
                  bookingData[key].imageUrl
                )
              );
            }
          }
          return bookings;
        }),
        tap((bookings) => {
          this.bookings.next(bookings);
        })
      );
  }
}
