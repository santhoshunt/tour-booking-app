import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [ImagePickerComponent],
  exports: [ImagePickerComponent],
  imports: [IonicModule, CommonModule],
})
export class PickersModule {}
