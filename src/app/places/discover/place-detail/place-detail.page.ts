import { BookingService } from './../../../bookings/booking.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ModalController,
  NavController,
  LoadingController,
  AlertController,
} from '@ionic/angular';

import { PlacesService } from './../../places.service';
import { Place } from './../../places.model';
import { CreateComponent } from './../../../bookings/create/create.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isLoading = false;
  private placeSub: Subscription;

  constructor(
    private navCtrl: NavController,
    private mdCtrl: ModalController,
    private placesService: PlacesService,
    private route: ActivatedRoute,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private alterCtrl: AlertController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.isLoading = true;
      console.log(paramMap.get('placeId'), this.isLoading);
      this.placeSub = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe(
          (place) => {
            this.place = place;
            this.isLoading = false;
            console.log(paramMap.get('placeId'), this.isLoading);
          },
          (error) => {
            this.alterCtrl
              .create({
                header: 'Unexpected Error',
                message: 'Unable to fetch place! please try again later.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.navCtrl.navigateBack('/places/tabs/discover');
                    },
                  },
                ],
                backdropDismiss: false,
              })
              .then((alertEl) => {
                alertEl.present();
              });
          }
        );
    });
    // this.place = this.placesService.getPlace()
  }

  ngOnDestroy() {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  onBooking() {
    // this.router.navigate(['/', 'places', 'tabs', 'discover']);
    // this.navCtrl.navigateBack('/places/tabs/discover');
    this.mdCtrl
      .create({
        component: CreateComponent,
        componentProps: { selectedPlace: this.place },
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        console.log(this.place);
        if (resultData.role === 'confirm') {
          this.loadingCtrl
            .create({ message: 'Booking Place...' })
            .then((loadingEl) => {
              loadingEl.present();
            });
          const data = resultData.data.bookingData;
          this.bookingService
            .addBooking(
              this.place.id,
              this.place.title,
              data.firstName,
              data.lastName,
              data.startDate,
              data.endDate,
              data.guestNumber,
              this.place.imageUrl
            )
            .subscribe(() => {
              this.loadingCtrl.dismiss();
            });
        }
      });
  }
}
