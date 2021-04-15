import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constant } from 'src/app/constants/constants';
import { Car } from 'src/app/models/car.model';
import { CrudService } from '../crud/crud.service';

@Injectable()
export class CarService extends CrudService<Car>{

  constructor(public http: HttpClient) {
      super(http, Constant.CAR);
  }

  public sellCar(uuid, data) {
    let url = Constant.BASE_URL + Constant.CAR + uuid; 
    return this.http.patch(url, data);
  }
}
