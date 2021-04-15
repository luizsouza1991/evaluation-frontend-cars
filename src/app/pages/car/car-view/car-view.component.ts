import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Car } from 'src/app/models/car.model';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css']
})
export class CarViewComponent implements OnInit {

  public car: Car = new Car();
  public uuid: string = null;

  @ViewChild('modalcarview') modalcarview: any;

  constructor(
    private modalService: NgbModal,
    private carService: CarService
  ) { }

  ngOnInit(): void {

  }

  public openModal()
  {
    this.getCar(this.uuid);
    this.modalService.open(this.modalcarview);
  }

  public async getCar(uuid: string) {
    await this.carService.show(uuid).subscribe((car:Car) => {
      this.car = car;
    });
  }

  public closeModal() {
    this.modalService.dismissAll();
  }
}
