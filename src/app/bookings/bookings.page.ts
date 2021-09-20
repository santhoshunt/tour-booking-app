import { Subscription } from 'rxjs';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[] = [];
  private bookingSub: Subscription;

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingSub = this.bookingService
      .getBookings()
      .subscribe((bookings) => {
        this.loadedBookings = bookings;
      });
  }

  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }
}
