import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Place } from './../../places/places.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  @Input() selectedPlace: Place;
  @ViewChild('f', { static: true }) form: NgForm;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    this.modalCtrl.dismiss(
      {
        bookingData: {
          firstName: this.form.value.firstName,
          lastName: this.form.value.lastName,
          guestNumber: this.form.value.numberOfGuest,
          startDate: this.form.value.fromDate,
          endDate: this.form.value.toDate,
        },
      },
      'confirm'
    );
  }

  validateDate() {
    const startDate = this.form.value.fromDate;
    const endDate = this.form.value.toDate;
    if (startDate && endDate) {
      return startDate < endDate;
    }
    return false;
  }
}
