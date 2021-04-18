import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './pages/car/car.component';
import { CarService } from './services/car/car.service';
import { HttpClientModule } from '@angular/common/http';
import { FormCarComponent } from './pages/car/form-car/form-car.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CarViewComponent } from './pages/car/car-view/car-view.component';
import { NgxIziToastModule } from 'ngx-izitoast';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    FormCarComponent,
    CarViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    NgxIziToastModule
  ],
  providers: [
    CarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
