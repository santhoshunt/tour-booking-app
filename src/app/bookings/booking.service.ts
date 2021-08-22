import { Booking } from './booking.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings: Booking[] = [
    {
      id: 'xyz',
      placeId: 'p1',
      placeTitle: 'Kodaikanal',
      guestNumber: 2,
      userId: 'abc',
    },
  ];

  getBookings(): Booking[]{
    return [...this.bookings];
  }
}
