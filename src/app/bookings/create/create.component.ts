import { ModalController } from '@ionic/angular';
import { Place } from './../../places/places.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input() selectedPlace: Place;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBook() {
    this.modalCtrl.dismiss(
      { message: 'Book button has been clicked' },
      'confirm'
    );
  }
}
