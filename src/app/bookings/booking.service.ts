import { BehaviorSubject } from 'rxjs';
import { Booking } from './booking.model';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { delay, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings = new BehaviorSubject<Booking[]>([]);

  constructor(private authService: AuthService) {}

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
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap((bookings) => {
        this.bookings.next(bookings.concat(newBooking));
      })
    );
  }

  cancelBooking() {}
}
