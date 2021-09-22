import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';

import { Place } from './../places.model';
import { PlacesService } from './../places.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[] = [];
  relevantPlaces: Place[] = [];
  isLoading = false;
  private loadedPlaceSub: Subscription;

  constructor(
    private placesService: PlacesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadedPlaceSub = this.placesService.places.subscribe((places) => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.loadedPlaceSub) {
      this.loadedPlaceSub.unsubscribe();
    }
  }

  onFilterUpdate(event: Event) {
    const detail = (event as CustomEvent<SegmentChangeEventDetail>).detail;
    if (detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
    } else {
      this.relevantPlaces = this.loadedPlaces.filter(
        (place) => place.userId !== this.authService.getUserId()
      );
    }
  }
}
