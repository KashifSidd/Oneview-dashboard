import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MaterialModule } from '../../../material.module';
import { FormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatStepperModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    DialogComponent
  ]
})
export class HomeModule {
}
