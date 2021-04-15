import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarComponent } from './pages/car/car.component';

const routes: Routes = [
  {
    path: '',
    component: CarComponent
  },
  {
    path: 'car',
    component: CarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
