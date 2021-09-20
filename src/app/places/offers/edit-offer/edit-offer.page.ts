import { Place } from './../../places.model';
import { PlacesService } from './../../places.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  form: FormGroup;
  place: Place;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe((place) => {
          this.place = place;
          this.form = new FormGroup({
            title: new FormControl(this.place.title, {
              updateOn: 'blur',
              validators: [Validators.required],
            }),
            description: new FormControl(this.place.description, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.maxLength(150)],
            }),
            price: new FormControl(this.place.price, {
              updateOn: 'blur',
              validators: [Validators.required, Validators.min(1)],
            }),
          });
        });
    });
  }

  navigateBack() {
    this.navCtrl.pop();
  }

  onEditOffer() {
    if (!this.form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        message: 'Updating Place...',
      })
      .then((ele) => ele.present());
    this.placesService
      .updateOffer(
        this.place.id,
        this.form.value.title,
        this.form.value.description,
        this.form.value.price
      )
      .subscribe(() => {
        this.loadingCtrl.dismiss();
        this.form.reset();
        this.router.navigateByUrl('/places/tabs/offers');
      });
  }
}
