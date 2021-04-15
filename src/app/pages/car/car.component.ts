import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car/car.service';
import { CarViewComponent } from './car-view/car-view.component';
import { FormCarComponent } from './form-car/form-car.component';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  public cars: Car[] = [];
  public search: string = null;

  @ViewChild(FormCarComponent, { static: false })
  formCar: FormCarComponent;

  @ViewChild(CarViewComponent, { static: false })
  carView: CarViewComponent

  constructor(
    public carService: CarService
  ) { }

  ngOnInit(): void {
    this.getCars();
  }

  public async getCars() {
    await this.carService.index().subscribe((data: Car[]) => {
      this.cars = data;
    })
  }

  public openModal() {
    this.formCar.openModal();
  }

  public updateList(car: Car) {
    this.cars = [...this.cars,car];
  }

  public editCar(car: Car) {
    this.formCar.edit = true;
    this.formCar.car = car;
    this.formCar.openModal();
  }

  public delete(car: Car) {
    this.carService.destroy(car.uuid).subscribe((data) => {
      this.removeFromList(car);
    });
  }

  public removeFromList(car: Car) {
    this.cars = this.cars.filter((c: Car) => c.uuid != car.uuid);
  }

  public sellCar(car: Car) {
    this.carService.sellCar(car.uuid, {vendido: true}).subscribe((data: Car) => {
      this.cars.map((c: Car) => {
        if (c.uuid == data.uuid) {
          c.vendido = data.vendido;
        }
      })
    });
  }

  public viewCar(uuid: string)
  {
    this.carView.uuid = uuid;
    this.carView.openModal();
  }

  public findCar(){
    if (this.search) {
      this.carService.search({veiculo: this.search}).subscribe((data: Car[]) => {
        this.cars = data;
      })
    } else {
      this.getCars();
    }
  }
}
