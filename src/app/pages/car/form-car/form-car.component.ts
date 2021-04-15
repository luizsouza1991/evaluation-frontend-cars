import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseModel } from 'src/app/models/base/base.model';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-form-car',
  templateUrl: './form-car.component.html',
  styleUrls: ['./form-car.component.css']
})
export class FormCarComponent implements OnInit {

  public car: Car = new Car();
  public edit: boolean = false;

  @ViewChild('modal') modal: any;
  @Output() addCar = new EventEmitter<BaseModel>();

  constructor(
    private modalService: NgbModal,
    private carService: CarService
  ) { }

  ngOnInit(): void {
  }

  public async openModal() {
    this.modalService.open(this.modal);
  }

  public async save() {
    if (this.edit) {
      this.update();
    } else {
      this.carService.create(this.car).subscribe((data: Car) => {
        this.car = new Car();
        this.modalService.dismissAll();
        this.addCar.emit(data);
      });
    }
  }

  public async update() {
    this.carService.update(this.car.uuid, this.car).subscribe((data: Car) => {
      this.edit = false;
      this.car = new Car();
      this.modalService.dismissAll();
    })
  }
}
