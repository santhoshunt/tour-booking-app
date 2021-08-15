import { PlacesService } from './../../places.service';
import { Place } from './../../places.model';
import { CreateComponent } from './../../../bookings/create/create.component';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;
  constructor(
    private router: Router,
    private navCtrl: NavController,
    private mdCtrl: ModalController,
    private placesService: PlacesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
    // this.place = this.placesService.getPlace()
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
      });
  }
}
