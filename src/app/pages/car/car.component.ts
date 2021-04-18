import { Component, OnInit, ViewChild } from '@angular/core';
import { Constant } from 'src/app/constants/constants';
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
  public carRegisterLastWeek: number = 0;
  public carForDecade: number = 0;
  public unsoldCars: number = 0;
  public marcas: any = Constant.MARCAS;
  public carsForBrand: any = [];
  public carsForDecade: any = [];
  public carsForFormat: any;

  @ViewChild(FormCarComponent, { static: false })
  formCar: FormCarComponent;

  @ViewChild(CarViewComponent, { static: false })
  carView: CarViewComponent

  constructor(
    public carService: CarService
  ) { }

  ngOnInit(): void {
    this.initCarsForBrand();
    this.getCars();
  }

  public initCarsForBrand() {
    this.marcas.map((marca: any) => {
      this.carsForBrand[marca.nome] = 0;
    });
  }

  public async getCars() {
    let currentDate = new Date();
    let lastWeekDate = currentDate.setDate(currentDate.getDate() - 7);

    await this.carService.index().subscribe((data: Car[]) => {
      data.map((car: Car) => {
        let decadeCar = parseInt(car.ano.toString().substr(0,3)+0);
        if (!car.vendido) {
          this.unsoldCars++;
        }

        if (new Date(car.created_at) >= new Date(lastWeekDate) && new Date(car.created_at) <= new Date()) {
          this.carRegisterLastWeek++;
        }

        this.marcas.map((marca: any) => {
          if (marca.nome == car.marca) {
            this.carsForBrand[marca.nome]++;
          }
        })

        if (car.ano >= decadeCar && car.ano <= (decadeCar + 9)) {
          if(isNaN(this.carsForDecade[decadeCar])) {
            this.carsForDecade[decadeCar] = 0;
          }
          this.carsForDecade[decadeCar] = this.carsForDecade[decadeCar] + 1;
        }
      })
      this.carsForDecadeFormat();
      this.cars = data;
    })
  }

  public openModal() {
    this.formCar.openModal();
  }

  public updateList(car: Car) {
    let decadeCar = parseInt(car.ano.toString().substr(0,3)+0);
    this.carRegisterLastWeek++;
    this.unsoldCars++;
    this.carsForBrand[car.marca]++;
    this.carsForDecade[decadeCar]++;
    this.carsForDecadeFormat();

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
    let currentDate = new Date();
    let lastWeekDate = currentDate.setDate(currentDate.getDate() - 7);
    let decadeCar = parseInt(car.ano.toString().substr(0,3)+0);

    if (new Date(car.created_at) >= new Date(lastWeekDate) && new Date(car.created_at) <= new Date()) {
      this.carRegisterLastWeek--;
    }

    if (!car.vendido) {
      this.unsoldCars--;
    }
    
    this.carsForBrand[car.marca]--;
    this.carsForDecade[decadeCar] = this.carsForDecade[decadeCar] - 1;
    
    this.carsForDecadeFormat();

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

  public carsForDecadeFormat() {
    this.carsForFormat = [];
    this.carsForDecade.map((data, index) => {
      this.carsForFormat = [...this.carsForFormat, {'decada': index, 'qtd_cars': data}]
    })
  }
}
